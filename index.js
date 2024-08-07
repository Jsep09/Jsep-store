const input = document.getElementById("input")
const searchButton = document.getElementById("button-addon2")
const select = document.getElementById('select')
let userData

const getUserInput = ()=>{
    userData = input.value
  }


const searchProduct = ()=>{
    searchButton.addEventListener("click",()=>{
        getUserInput()
        searchResApi()
    })
    input.addEventListener("keypress",(e)=>{
        if (e.key === "Enter") {
            getUserInput()
            searchResApi()
        }
    })
}

searchProduct()

const searchResApi = async ()=>{
    const Url = `https://dummyjson.com/products/search?q=${userData}` // End point Search product
try {
    const response = await fetch(Url)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json()
    console.log(json);
} catch (error) {
    console.log(error);
    
}
}

// Get products by a category
// fetch('https://dummyjson.com/products/category/smartphones')
// .then(res => res.json())
// .then(console.log);
// https://dummyjson.com/products/category/beauty

let categoryData 
const getCategory = ()=>{
    select.addEventListener("change",(e)=>{
        categoryData = e.target.value
        console.log(e.target.value);
        searchByCategoryApi()
    })
}
getCategory();


const searchByCategoryApi = async ()=>{
    const Url = `https://dummyjson.com/products/category/${categoryData}/`
    try {
        const response = await fetch(Url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json()
        console.log(json);
        
    } catch (error) {
        console.log(error);
        
    }
}


