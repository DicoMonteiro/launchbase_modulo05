const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")
for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    // Logica feita diferente do implementado para Instructors, na qual pegava 2 a mais ou a menos que a selecionada
    // nesse caso ele somente quer o sucessor seguido e o antecessor (1 de cada lado)
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndSecondPages = currentPage == 1 || currentPage == 2
        const penultimateAndLastPages = currentPage == totalPages - 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

        if (firstAndSecondPages || penultimateAndLastPages || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
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

function createPagination(pagination) {
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = pagination.dataset.filter
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}