const input = document.getElementById("input");
const searchButton = document.getElementById("button-addon2");
const select = document.getElementById("select");

const cardContainer = document.getElementById("card-container");

let userData;

const getUserInput = () => {
  userData = input.value;
};

const searchProduct = () => {
  searchButton.addEventListener("click", (e) => {
    cardContainer.innerHTML =""
    getUserInput();
    // searchResApi();
    renderRefactor(searchResApi) //ส่งฟังชั่น searchResApi เข้าไปเป็น Argument ของ renderRefactor  => High order function
  });
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      cardContainer.innerHTML =""
      getUserInput();
    //   searchResApi();
      renderRefactor(searchResApi)
    }
  });
};

searchProduct() //เรียกใช้ไว้เลย เวลากด Enter หรือ clickSearch

const searchResApi = async () => {
  const Url = `https://dummyjson.com/products/search?q=${userData}&limit=12`; // Endpoint Search product
  try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    let titleData = [];
    let descriptionData = [];
    let imagesData = [];
    let priceData = [];

    data.products.forEach((e) => {
      titleData.push(`${e.brand} - ${e.title}`);
      descriptionData.push(e.description);
      imagesData.push(e.images[0]);
      priceData.push(e.price);
    });

    return { titleData, descriptionData, imagesData, priceData };
  } catch (error) {
    console.log(error);
  }
};
let categoryData;
const getCategory = () => {
  select.addEventListener("change", (e) => {
    cardContainer.innerHTML = "" // เซ็ทเป็นค่าว่างก่อน 
    categoryData = e.target.value;
    console.log(e.target.value);
    renderRefactor(searchByCategoryApi) // ส่ง searchByCategoryApi เข้าไปเป็น Argument ของ renderRefactor => High order function

  });
};
getCategory(); //เรียกใช้ไว้เลย เวลากด click catergory นั้นๆ
const searchByCategoryApi = async () => {
  const Url = `https://dummyjson.com/products/category/${categoryData}`;
  
  try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    
    let titleData = [];
    let descriptionData = [];
    let imagesData = [];
    let priceData = [];

    data.products.forEach((e) => {
      titleData.push(`${e.brand} - ${e.title}`);
      descriptionData.push(e.description);
      imagesData.push(e.images[0]);
      priceData.push(e.price);
    });

    return { titleData, descriptionData, imagesData, priceData };
  } catch (error) {
    console.log(error);
  }
};
// searchByCategoryApi().then((e)=>{
//     console.log("this is catergory data",e);
    
// })

//brand join str - title, description , images , price
const getResIntroProduct = async () => {
  const randomNum = Math.floor(Math.random()*10)
  const Url = `https://dummyjson.com/products?limit=12&skip=${randomNum}`;
  try {
    const response = await fetch(Url);
    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }
    const data = await response.json();
    // console.log("data = ", data.products);
    let titleData = [];
    let descriptionData = [];
    let imagesData = [];
    let priceData = [];

    data.products.forEach((e) => {
      titleData.push(`${e.brand} - ${e.title}`);
      descriptionData.push(e.description);
      imagesData.push(e.images[0]);
      priceData.push(e.price);
    });

    return { titleData, descriptionData, imagesData, priceData };
  } catch (error) {
    console.log(error);
  }
};

const createRow = () => {
  const divRow = document.createElement("div");
  divRow.classList.add(
    "row",
    "d-flex",
    "justify-content-start",
    "align-items-center"
  );
  return divRow;
};

const createCard = (title, text, imagesSrc, price) => {
  const divColumn = document.createElement("div");
  divColumn.classList.add(
    "col-6",
    "col-sm-6",
    "col-md-6",
    "col-lg-3",
    "col-xl-3",
    "mb-3"
  );

  const divCard = document.createElement("div");
  divCard.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = `${imagesSrc}`;

  const divCardBody = document.createElement("div");
  divCardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = `${title}, $${price}`;

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.innerText = `${text}`;

  divCardBody.appendChild(cardTitle);
  divCardBody.appendChild(cardText);
  divCard.appendChild(img);
  divCard.appendChild(divCardBody);
  divColumn.appendChild(divCard);

  return divColumn;
};

const renderIntroProduct = async () => {
  const data = await getResIntroProduct();
  try {
    let currentRow = createRow(); // สร้าง row แรก
    for (let i = 0; i < data.titleData.length; i++) {
      if (i % 4 === 0) {
        cardContainer.appendChild(currentRow);
        // กำหนดให้ currentRow เป็นแถวใหม่
        currentRow = createRow();
      }
      const card = createCard(
        data.titleData[i],
        data.descriptionData[i],
        data.imagesData[i],
        data.priceData[i]
      );
      currentRow.appendChild(card);
    }
    cardContainer.appendChild(currentRow); // ถ้ายังมี card เหลือก็จะสร้างแถวใหม่
  } catch (error) {
    console.log(error);
  }
};

renderIntroProduct(); //render มาเลย


const renderRefactor = async (func)=>{
    const data = await func()
    try {
        let currentRow = createRow();
        for (let i = 0; i < data.titleData.length; i++) {
          if (i % 4 === 0 ) {
            cardContainer.appendChild(currentRow);
            // กำหนดให้ currentRow เป็นแถวใหม่
            currentRow = createRow();
          }
          const card = createCard(
            data.titleData[i],
            data.descriptionData[i],
            data.imagesData[i],
            data.priceData[i]
          );
          currentRow.appendChild(card);
        }
        cardContainer.appendChild(currentRow); // ถ้ายังมี card เหลือก็จะสร้างแถวใหม่
      } catch (error) {
        console.log(error);
      }
}

// 2 ฟังชั่น Render ไม่จำเป็นแล้ว
// const renderSearchProduct= async ()=>{
//     const data = await searchResApi()
//     try {
//         let currentRow = createRow();
//         for (let i = 0; i < data.titleData.length; i++) {
//           if (i % 4 === 0 ) {
//             cardContainer.appendChild(currentRow);
//             // กำหนดให้ currentRow เป็นแถวใหม่
//             currentRow = createRow();
//           }
//           const card = createCard(
//             data.titleData[i],
//             data.descriptionData[i],
//             data.imagesData[i],
//             data.priceData[i]
//           );
//           currentRow.appendChild(card);
//         }
//         cardContainer.appendChild(currentRow); // ถ้ายังมี card เหลือก็จะสร้างแถวใหม่
//       } catch (error) {
//         console.log(error);
//       }
// }


// const renderCategoryProduct= async ()=>{
//     const data = await searchByCategoryApi()
//     console.log(data);
    
    
//     try {
//         let currentRow = createRow();
//         for (let i = 0; i < data.titleData.length; i++) {
//           if (i % 4 === 0 ) {
//             cardContainer.appendChild(currentRow);
//             // กำหนดให้ currentRow เป็นแถวใหม่
//             currentRow = createRow();
//           }
//           const card = createCard(
//             data.titleData[i],
//             data.descriptionData[i],
//             data.imagesData[i],
//             data.priceData[i]
//           );
//           currentRow.appendChild(card);
//         }
//         cardContainer.appendChild(currentRow); // ถ้ายังมี card เหลือก็จะสร้างแถวใหม่
//       } catch (error) {
//         console.log(error);
//       }
// }


