const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    // Adicionando a class no html, e assim manter com o metodo INCLUDES sempre na funcionalidade atual
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// console.log(currentPage)

// PAGINAÇÃO (Mostrando como ficaria a logica para tratar a paginacao e exibicao das proximas a pagina selecionada)
// totalPages = 20
// selectedPage = 15
// [1, ..., 13, 14, 15, 16, 17, ..., 20]

// let totalPages = 20,
//     selectedPage = 6,
//     pages = [],
//     oldPage

// for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
//     const firstAndLastPages = currentPage == 1 || currentPage == totalPages
//     // Logica: currentPage sendo igual a 15 (selectedPage), verifica se é menor/igual do que 15 (selectedPage) + 2,
//     // no caso 16 e o 17, entra nessa lógica de ser menor/igual ao selectedPage.
//     const pagesAfterSelectedPage = currentPage <= selectedPage + 2
//     const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
    
//     if (firstAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
//         if (oldPage && currentPage - oldPage > 2) {
//             pages.push("...")
//         }

//         if (oldPage && currentPage - oldPage == 2) {
//             pages.push(oldPage + 1)
//         }
//         pages.push(currentPage)
//         oldPage = currentPage
//     }
// }

// console.log(pages)

// Regra de usar o "..." para a paginacao
// Verificar sempre o atual (currentPage) com o anterior (oldPage) e verificar se é maior do que 2


function paginate(selectedPage, totalPages) {
    let pages = [],
    oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        
        if (firstAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}

const pagination = document.querySelector(".pagination")
// Usando o '+' para converter para numérico
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const filter = pagination.dataset.filter
const pages = paginate(page, total)


console.log(pages)

// Inserindo a paginação no HTML
let elements = ""

for (let page of pages) {
    if (String(page).includes("...")) {
        elements += `<span>${page}</span>`
    } else {
        // elements += `<a href="?page=${page}">${page}</a>`
        if (filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
}

pagination.innerHTML = elements