describe(" 컴포넌트 테스트", () => {
  it("컴포넌트가 렌더링된다.", () => {
    cy.visit("http://localhost:8080");

    cy.get(".app").should("be.visible");
  });
});
