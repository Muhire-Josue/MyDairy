import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import testData from './data/mockData';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('User tests', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/api/v2/')
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('welcome to MyDiary application');
        done();
      });
  });

  it('should be signup', (done) => {
    const user = testData[0];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully!');
        done();
      });
  });

  it('should not signup when provided invalid values', (done) => {
    const user = testData[1];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
  it('should not signup when provided invalid values', (done) => {
    const user = testData[2];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
  it('should not signup when provided invalid values', (done) => {
    const user = testData[3];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
  it('should not duplicate a user', (done) => {
    const user = testData[4];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Email already exists');
        done();
      });
  });

  it('Should login a user', (done) => {
    const user = testData[5];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('User logged in successfully!');
        done();
      });
  });

  it('Should not login non-existing user', (done) => {
    const user = testData[6];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('User not found');
        done();
      });
  });

  it('Should not login provided incorrect password', (done) => {
    const user = testData[7];
    chai.request(server)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Password do not match');
        done();
      });
  });
});
