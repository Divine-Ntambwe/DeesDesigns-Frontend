describe("testing Login with correct creds", () => {
  before(() => {
    cy.visit("http://localhost:5173/Login");
  });
  it("should log customer user in", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Log In");

    cy.get("#login-email").type("divinentambwe28@gmail.com");
    cy.get("#login-password").type("12345678-D");
    cy.get("#login").click();
  });

 

});

describe("testing customer Login with incorrect creds", () => {
  before(() => {
    cy.visit("http://localhost:5173/Login");
  });

   it("should log not log customer user in with incorrect password", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Log In");

    cy.get("#login-email").type("divinentambwe28@gmail.com");
    cy.get("#login-password").type("12345678-F");
    cy.get("#login").click();
    cy.contains("incorrect password");
    cy.url().should('include', '/Login');


  });

});

describe("testing designer Login", () => {
  before(() => {
    cy.visit("http://localhost:5173/Login");
  });
  it("should log designer user in", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Log In");

    cy.get("#login-email").type("carmel@gmail.com");
    cy.get("#login-password").type("12345678-C");
    cy.get('input[type="checkbox"]').check()
    cy.get("#login").click();
  });

});

describe("testing designer Login with incorrect creds", () => {
  before(() => {
    cy.visit("http://localhost:5173/Login");
  });

   it("should log not log designer user in with incorrect password", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Log In");

    cy.get("#login-email").type("carmel@gmail.com");
    cy.get("#login-password").type("12345678-F");
    cy.get('input[type="checkbox"]').check()
    cy.get("#login").click();

    cy.contains("incorrect password");
    cy.url().should('include', '/Login');


  });

});


describe("testing customer signup", () => {
  before(() => {
    cy.visit("http://localhost:5173/customerSignUp");
  });
  it("should create a new customer user", () => {
    cy.get('[data-testid="cust-signup-title"]')
      .should("exist")
      .should("have.text", "Sign Up");

    cy.get("#cust-name").type("Test");
    cy.get("#cust-surname").type("User");
    cy.get("#cust-email").type(`testuser${new Date().getTime()}@gmail.com`);

    cy.get('input[type="radio"]').check();
    cy.get("#cust-number").type("0786768907");
    cy.get("#password").type("2345678-N");
    cy.get("#confirm-password").type("2345678-N");
    cy.get("#cust-signup").click();
    cy.get("#user-details").should("exist").should("contain.text",`Hi Test`)
  });

});

describe("testing customer signup with mismatching password", () => {
  before(() => {
    cy.visit("http://localhost:5173/customerSignUp");
  });
  it("should  create new customer user", () => {
    cy.get('[data-testid="cust-signup-title"]')
      .should("exist")
      .should("have.text", "Sign Up");

    cy.get("#cust-name").type("Test");
    cy.get("#cust-surname").type("User");
    cy.get("#cust-email").type(`testuser${new Date().getTime()}@gmail.com`);

    cy.get('input[type="radio"]').check();
    cy.get("#cust-number").type("0786768907");
    cy.get("#password").type("2345678-N");
    cy.get("#confirm-password").type("2345678-n");
    cy.get("#cust-signup").click();
    cy.contains("Passwords do not match")
    cy.url().should("include","/customerSignUp")
  });

});

describe("testing designer Sign Up with mismatching passwords", () => {
  let email;
  before(() => {
    cy.visit("http://localhost:5173/designerSignUp");
    email = `testuser${new Date().getTime()}@gmail.com`
  });
  it("should create new designer user", () => {
    cy.get('#des-sign-up-heading')
      .should("exist")
      .should("have.text", "Sign Up");
    cy.get("#upload-pfp").selectFile('43859a0c15a222ee91b7025af0d0d25b.jpg')
    cy.get("#des-name").type("Test");
    cy.get("#des-surname").type("User");
    cy.get("#des-signup-email").type(`${email}`);

    cy.get('input[type="radio"]').check();
    cy.get("#des-number").type("0786768907");
    cy.get("#des-signup-password").type("2345678-N");
    cy.get("#des-signup-con-password").type("2345678-n");
    cy.get("#des-signup").click();
    cy.contains("Passwords do not match")
    cy.url().should("include","/designerSignUp")
  });

});

describe("testing designer Sign Up", () => {
  let email;
  before(() => {
    cy.visit("http://localhost:5173/designerSignUp");
    email = `testuser${new Date().getTime()}@gmail.com`
  });
  it("should create new designer user", () => {
    cy.get('#des-sign-up-heading')
      .should("exist")
      .should("have.text", "Sign Up");
    cy.get("#upload-pfp").selectFile('43859a0c15a222ee91b7025af0d0d25b.jpg')
    cy.get("#des-name").type("Test");
    cy.get("#des-surname").type("User");
    cy.get("#des-signup-email").type(`${email}`);

    cy.get('input[type="radio"]').check();
    cy.get("#des-number").type("0786768907");
    cy.get("#des-signup-password").type("2345678-N");
    cy.get("#des-signup-con-password").type("2345678-N");
    cy.get("#des-signup").click();
    cy.get("#designer-home-email").should("exist").should("contain.text",email)

  });

});


describe("testing Add to cart", () => {
  before(() => {
    cy.visit("http://localhost:5173/Login");
  });
  it("should log customer user in", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Log In");

    cy.get("#login-email").type("divinentambwe28@gmail.com");
    cy.get("#login-password").type("12345678-D");
    cy.get("#login").click();

    cy.get('[data-testid="main-slogan"]')
      .should("exist")
      .should("contain.text", "Get");

    cy.get("#68a2db88d39fff0320a978b5").click();
    cy.get("#AddToCart").should("exist").should("have.text", "Add To Cart");
    cy.get("#add-to-cart-btn").click();
    cy.get("#cart-item-68a2db88d39fff0320a978b5")
      .should("exist")
      .should("have.text", "Teal Graduation Dress");
  });
})
