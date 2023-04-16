const apiUsers = `${Cypress.env("apiUrl")}/users`;
// import user from "../fixtures/users.json";

describe("Front end test suite", function () {
  it("Should be able to close top banner", function () {
    cy.visit("https://www.spotme.com/");
    cy.get("#to-close").should("be.visible");
    cy.get("div#to-close").click();
    cy.get("#to-close").should("not.exist");
  });

  it("Should get a list of users", () => {
    cy.request("GET", `${apiUsers}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.lengthOf(6);
    });
  });

  it("Should get details of an user", () => {
    cy.fixture("users").then((usersData) => {
      cy.request("GET", `${apiUsers}/1`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.deep.equal(usersData[0]);
      });
    });
  });
});
