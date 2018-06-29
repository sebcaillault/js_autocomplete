// keycodes of the keys on the keyboard
const keyup = 38;
const keydown = 40;


window.onload = function(){

    let searchTab = document.getElementById('search-tab');
    let resultBox = document.getElementById('result-box');
    
    // event listener for the input field
    searchTab.addEventListener('keyup', myAutocomplete);
    searchTab.addEventListener('keydown', cityHighlight);
                
    
    /**
     * makes Ajax request to the database and returns the cities matching the query string
     * @param {*} e 
     */
    function myAutocomplete(e)
    {

        if (e.keyCode !== keyup && e.keyCode !== keydown) {

            let query = e.target.value;

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "searchController.php");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            let params = 'action=autocomplete&query='+query;
    
            xhr.onload = ()=>
            {
                if (xhr.status === 200)
                {
                    
                    let cities = JSON.parse(xhr.responseText); // json array of cities with {"nom:", "code_postale:"}
                    
                    while (resultBox.hasChildNodes()) {
                        resultBox.removeChild(resultBox.lastChild);
                    }
            
                    for (let i = 0; i < cities.length; i++) {
                        const city = cities[i];        
    
                        let p = document.createElement('P');
                        p.innerHTML = city.nom + ' [' + city.code_postale + ']';
                        p.addEventListener('click', selectCity);
                        resultBox.appendChild(p);
    
                        resultBox.firstChild.classList.add('highlighted');
                    }
                } 
            }
            xhr.send(params);
        }
    }

    function cityHighlight(e) {
        let key = e.keyCode;
        let results = resultBox.childNodes;
        let count = resultBox.childElementCount;
        

        // recup tout les <p>
        // cherche celui qui a la classe .highlighted
        // enlever la classe du <p>
        // ajouter la classe au p+1 (si <p> != <p> count) ou p-1 (si <p> != 0)

        if (key === keydown) {
            console.log('down');
            console.log(results);

            for (let i = 0; i < count; i++) {
                
                if (results[i].classList.contains('highlighted')) {
                    results[i].classList.remove('highlighted');
                    results[i+1].classList.add('highlighted');
                    break;
                }   
            }
        } else if (key === keyup){
            console.log('up');
            for (let i = 0; i < count; i++) {
                
                if (results[i].classList.contains('highlighted')) {
                    results[i].classList.remove('highlighted');
                    results[i-1].classList.add('highlighted');
                    break;
                }   
            }
        }    
    }

    /**
     * Changes the value of the input field to the name of the city clicked
     * @param {*} e 
     */
    function selectCity(e) {
        searchTab.value = e.target.innerHTML;
        
        resultBox.childNodes.forEach(element => {
            element.classList.remove('highlighted');
        });

        e.target.classList.add('highlighted');
    }

} // fin du onload
