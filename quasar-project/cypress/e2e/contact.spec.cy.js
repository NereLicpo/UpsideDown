describe("Kontakt forma", () => {
  it("uspješno šalje poruku", () => {
    cy.visit("http://localhost:9000/Kontakti");

    cy.get('[data-test="contact-name"]').type("Ivana Testerica");
    cy.get('[data-test="contact-email"]').type("ivana@example.com");
    cy.get('[data-test="contact-message"]').type("Ovo je test poruka.");

    cy.intercept("POST", "http://localhost:3000/api/messages").as(
      "sendMessage"
    );

    cy.get('[data-test="contact-submit"]').click();

    // Pričekaj backend odgovor (mockiran ovdje)
    cy.wait("@sendMessage").its("response.statusCode").should("eq", 200);

    // Ovdje Cypress ne može provjeriti native `alert`, osim ako se stubba
    // Ako želiš: cy.on('window:alert', (text) => expect(text).to.equal('Poruka uspješno poslana!'));
  });

  it("ne šalje poruku ako su polja prazna", () => {
    cy.visit("http://localhost:9000/Kontakti");

    cy.get('[data-test="contact-submit"]').click();

    // Cypress može osluškivati alert, ako želiš to testirati:
    cy.on("window:alert", (text) => {
      expect(text).to.include("Molimo ispunite sva polja");
    });
  });
});
