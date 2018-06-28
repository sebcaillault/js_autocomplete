window.onload = function(){

    let searchTab = document.getElementById('search-tab');
    let resultBox = document.getElementById('result-box');
    
    // event listener for the input field
    searchTab.addEventListener('keyup', myAutocomplete);
    
    
    
    /**
     * makes Ajax request to the database and returns the cities matching the query string
     * @param {*} e 
     */
    function myAutocomplete(e)
    {
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
                console.log(cities);

                while (resultBox.hasChildNodes()) {
                    resultBox.removeChild(resultBox.lastChild);
                }
        
                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i];        

                    let p = document.createElement('P');
                    p.innerHTML = city.nom + ' [' + city.code_postale + ']';
                   // p.addEventListener('click')
                    resultBox.appendChild(p);
                }
            } 
        }

        xhr.send(params);
    }
} // fin du onload
