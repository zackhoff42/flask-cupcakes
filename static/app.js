const BASE_URL = "/api/cupcakes"

function generateCupcakeMarkup(cupcake) {
    return `
    <li data-cupcake-id=${cupcake.id}>
        <img src=${cupcake.image}>
        ${cupcake.flavor} - ${cupcake.size} - ${cupcake.rating}
    </li>`;
}

async function showAllCupcakes() {
    const resp = await axios.get(`${BASE_URL}`);

    for (let cupcake of resp.data.cupcakes) {
        let newCupcake = $(generateCupcakeMarkup(cupcake));
        $('#all-cupcakes').append(newCupcake);
    }
}

showAllCupcakes();

$('#new-cupcake-form').on("submit", async function (e) {
    e.preventDefault();

    let flavor = $("#flavor").val();
    let size = $("#size").val();
    let rating = $("#rating").val();
    let image = $("#image").val();

    if (!image) {
        image = null;
    }

    const resp = await axios.post(`${BASE_URL}`, { flavor, size, rating, image });

    let newCupcake = $(generateCupcakeMarkup(resp.data.cupcake));
    $('all-cupcakes').append(newCupcake);
    $('new-cupcake-form').trigger("reset");
});