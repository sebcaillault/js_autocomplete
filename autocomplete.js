// keycodes of the keys on the keyboard
const keyup = 38;
const keydown = 40;
const enter = 13;


window.onload = function()
{
    let searchTab = document.getElementById('search-tab');
    let resultBox = document.getElementById('result-box');
    
    // event listener for the input field
    searchTab.addEventListener('keyup', myAutocomplete);
    searchTab.addEventListener('keydown', keydownSwitch);
                
    
    /**
     * makes Ajax request to the database and returns the cities matching the query string
     * @param {*} e 
     */
    function myAutocomplete(e)
    {
        if (e.keyCode !== keyup && e.keyCode !== keydown)
        {
            if (e.target.value.length === 0)
            {
                emptyResultBox();  
            }
            else
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
                        emptyResultBox();
                
                        for (let i = 0; i < cities.length; i++)
                        {
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
    }

    /**
     * Checks which key is down and call the right method
     * @param {*} e 
     */
    function keydownSwitch(e)
    {    
        switch (e.keyCode)
        {
            case enter:
                selectCityOnEnter(e);
                break;
        
                case keyup:
                cityHighlight(e);
                break;

                case keydown:
                cityHighlight(e);
                break;
        }
    }

    function cityHighlight(e)
    {
        let key = e.keyCode;
        let results = resultBox.childNodes;
        let count = resultBox.childElementCount;

        if (key === keydown)
        {    
            for (let i = 0; i < count; i++)
            {
                
                if (results[i].classList.contains('highlighted'))
                {
                    if (i !== count-1)
                    {
                        results[i].classList.remove('highlighted');
                        results[i+1].classList.add('highlighted');
                        break;
                    }
                }   
            }
        }
        else if (key === keyup)
        {
            for (let i = 0; i < count; i++)
            {    
                if (results[i].classList.contains('highlighted'))
                {
                    if (i > 0)
                    {
                        results[i].classList.remove('highlighted');
                        results[i-1].classList.add('highlighted');
                        break;
                    }
                }   
            }
        }    
    }

    /**
     * Changes the value of the input field to the name of the city clicked
     * @param {*} e 
     */
    function selectCity(e)
    {
        searchTab.value = e.target.innerHTML;
        resultBox.childNodes.forEach(element => { element.classList.remove('highlighted'); });
        e.target.classList.add('highlighted');
    }

    /**
     * Adds the highlighted city into the input field
     * @param {*} e 
     */
    function selectCityOnEnter(e)
    {
        let results = resultBox.childNodes;

        for (let i = 0; i < results.length; i++)
        {
            const element = results[i];
            if (element.classList.contains('highlighted'))
            {
                searchTab.value = element.innerHTML;
                break;
            }
        }
    }

    /**
     * Empties the results box
     */
    function emptyResultBox() {
        while (resultBox.hasChildNodes())
        {
            resultBox.removeChild(resultBox.lastChild);
        } 
    }
} // fin du onload
