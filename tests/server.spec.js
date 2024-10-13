const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  it("GET/cafes status 200 y tipo de dato arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toBeInstanceOf(Object);
  });

  it('DELETE/cafes status 404 para id que no existe', async () => {
    const response = await request(server).delete('/cafes/10').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHZpZGFzYW5hLmNvbSIsImlhdCI6MTcyODE3NTg5Nn0.b1-GOPqEGTpExBQeRBPh0KIg8tR03mMPnqF-b8qwTu8');;
    console.log('Test delete status',response.status);
     expect(response.status).toBe(404);
  });

  it("POST/cafes status 201 al agregar nuevo cafe", async () => {
    const nuevoCafe = {
        id: 5, 
        nombre: "Expresso"
      };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
  });

  it("PUT/cafes status 400 si id params es distinto al id payload", async () => {
    const cafe = {
        id: 1, 
        nombre: "Cortado"
      };
    const response = await request(server).put("/cafes/3").send(cafe);
    expect(response.status).toBe(400);
  });

});
