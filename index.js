import {menuArray} from '/data.js'

const container = document.getElementById('container')
const checkOut = document.getElementById('check-out')

const addToCartIdArray = []



function checkEmptyCart(){
    if (addToCartIdArray == 0){
        checkOut.classList.toggle('hidden')
    } else {
        checkOut.classList.remove('hidden')
}
}


function render(foodData){
    return foodData.map(data =>{
        const {name, ingredients, id, price, emoji} = data
        const ingredientsString = ingredients.join(', ')
        
        return `<div class="item" id="${id}">
            <div class="item-container">
                <p class="emoji">${emoji}</p>
                <div class="item-description">
                    <h4 class="title">${name}</h4>
                    <p class="ingredients">${ingredientsString}</p>
                    <h5 class="price">$${price}</h5>
                </div>
                <button class="add-item">+</button>
            </div>
        </div>`
    }).join('');
}


container.innerHTML = render(menuArray)

function countOfSimilarId(id){
    if (addToCartIdArray.length !== 0){
        return addToCartIdArray.filter(data => data === id).length
    }
}
        

 
    
function getTotal(){
     return menuArray.map(element => {
        const {name, ingredients, id, price, emoji} = element
        return countOfSimilarId(id.toString()) * price
}).reduce((final, last) => final + last, 0)
}

function renderTotal(number){
    document.getElementById('total-container').innerHTML = `
    <p class="total-bill-text">Total Price:</p>
    <p class="total-bill-value">$${number}</p>`
}


function removeItem(id){
    if (addToCartIdArray.includes(id)){
        const index = addToCartIdArray.indexOf(id)
        return addToCartIdArray.splice(index, 1)
    }
}

function renderCart(){
         return menuArray.map(element =>{
            const {name, ingredients, id, price, emoji} = element
            if (addToCartIdArray.includes(id.toString())){
                   return `
                        <div class="order-tile">
                        <h4 class="title">${name}</h3>
                        <button class="remove-item" id="remove-${id}">remove</button>
                        <p class="total-qty">${countOfSimilarId(id.toString())}</p>
                        <p class="total-price">$${countOfSimilarId(id.toString()) * price}</p>
                        </div>
                    `
        }}).join(' ') 
    }

document.addEventListener('click',function(e){
    if(e.target.className === 'add-item'){
        let productId = e.target.parentElement.parentElement.id
        menuArray.filter(item => {
            if (item.id == productId){
                addToCartIdArray.push(productId)
                console.log(addToCartIdArray)
                countOfSimilarId(productId)
                document.getElementById('order-details').innerHTML = renderCart()
                checkEmptyCart()
                renderTotal(getTotal())
            }
        })
        
    }
    else if (e.target.className == 'remove-item'){
        let productId = e.target.id.split('-')[1].toString()
        removeItem(productId)
        countOfSimilarId(productId)
        document.getElementById('order-details').innerHTML = renderCart()
        checkEmptyCart()
        renderTotal(getTotal())
    } else if (e.target.id == "complete-order"){
        document.getElementById('form').style.display = 'block'
    
    } else if (e.target.id === 'pay-btn'){
        document.getElementById('form').style.display = 'none'
        const customerName = document.getElementById("form-inp-name").value
        checkOut.innerHTML = ` <div class="confirmation-container"><p class="confirmation-message">Thanks ${customerName}, your order is on the way</p></div>
        `
    }
})

checkEmptyCart()
