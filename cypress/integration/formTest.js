// test that you can submit the form

describe("Form Test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    //GETTERS
    const nameInput = () => cy.get("input[name=name]")
    const sizeInput = () => cy.get("select[name=size]")
    const toppingOneInput = () => cy.get("input[name=topping1]")
    const toppingTwoInput = () => cy.get("input[name=topping2]")
    const toppingThreeInput = () => cy.get("input[name=topping3]")
    const toppingFourInput = () => cy.get("input[name=topping4]")
    const specialInput = () => cy.get("input[name=special]")
    const submitButton = () => cy.get(`input[id="order-button"]`)

    it("sanity check", () => {
        expect(1+2).to.equal(3)
        expect(2 + 2).not.to.equal(5)
    })
    it("All inputs exist", () => {
        nameInput().should("exist")
        sizeInput().should("exist")
        toppingOneInput().should("exist")
        toppingTwoInput().should("exist")
        toppingThreeInput().should("exist")
        toppingFourInput().should("exist")
        specialInput().should("exist")
        submitButton().should("exist")
    })
    it("Can write in inputs", () => {
        nameInput()
        .should("have.value", "")
        .type("Joanna")
        .should("have.value", "Joanna")

        specialInput()
        .should("have.value", "")
        .type("No special instructions")
        .should("have.value", "No special instructions")
    })
    it("Can select multiple toppings", () => {
        cy.get(`input[type="checkbox"]`).check(["topping1", "topping2", "topping3", "topping4"])
    })
    it("Can submit form", () => {
        submitButton().should("be.disabled")
        cy.contains("Order!")
    })
})

