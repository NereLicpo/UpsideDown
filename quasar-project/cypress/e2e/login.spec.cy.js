describe("Login funkcionalnost", () => {
  it("Uspješan login", () => {
    cy.visit("http://localhost:9000/login");
    cy.get('[data-test="email"]').type("user"); // koristiš stvarnog usera iz baze
    cy.get('[data-test="password"]').type("user");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/"); // ili "/admin" ako je admin korisnik
  });

  it("Neispravan login", () => {
    cy.visit("http://localhost:9000/login");
    cy.get('[data-test="email"]').type("pogresan@test.com");
    cy.get('[data-test="password"]').type("krivo");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error-message"]').should("contain", "Invalid");
  });
});
