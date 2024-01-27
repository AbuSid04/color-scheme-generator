const colorPickingForm = document.getElementById('color-picking-form')
const colorHex = document.getElementById("color-hex")
const colorSeed = document.getElementById("color-seed")
const colorPallet = document.getElementById("color-pallet")
const colorPalletIds = document.querySelector("footer")

let pallet = []

colorPickingForm.addEventListener("submit", getColorPallets)

function getColorPallets(e){
    e.preventDefault()
    
    const color = colorHex.value.replace('#','')
    const seed = colorSeed.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${seed}&count=5`)
        .then(res => res.json())
        .then(data => {
            pallet = data.colors.map(color => color.hex.value)
            renderPallets()
            pallet = []
        })
    }

function renderPallets(){

    let colorHtml = ""
    let colorHexIds = ""
    pallet.forEach(color => {
        colorHtml += `<div id="${color}" class="color-seed-opt"></div>`
        colorHexIds += `<p>${color}</p>`
    })

    colorPallet.innerHTML = colorHtml
    colorPalletIds.innerHTML = colorHexIds

    pallet.forEach(color =>{
        document.getElementById(color).style.backgroundColor = color
    })   
}