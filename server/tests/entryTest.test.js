/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import testData from './data/mockData';


chai.use(chaiHttp);
chai.should();
const { expect } = chai;
let userToken = '';
describe('Entries test', () => {
  it('should be signup', (done) => {
    const user = testData[15];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        userToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully!');
        done();
      });
  });
  it('should add an entry', (done) => {
    const entry = testData[8];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('Entry successfully created');
        done();
      });
  });

  it('should add an entry', (done) => {
    const entry = testData[8];

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Incorrect Route');
        done();
      });
  });

  it('should not add an entry if user didnot signin', (done) => {
    const entry = testData[9];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });

  it('should not add an entry provided invalid token', (done) => {
    const entry = testData[10];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', 'Bearer undefined')
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });

  it('should not add invalid input', (done) => {
    const entry = testData[11];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
});
