/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('User tests', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/auth/')
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('welcome to MyDiary application');
        done();
      });
  });

  it('should be signup', (done) => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'user2@example.com',
      password: 'user4',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully!');
        done();
      });
  });

  it('should not signup when provided invalid values', (done) => {
    const user = {
      firstname: 'John',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });
  it('should not duplicate a user', (done) => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'user2@example.com',
      password: 'user4',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Email already exists');
        done();
      });
  });

  it('Should login a user', (done) => {
    const user = {
      email: 'user2@example.com',
      password: 'user4',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('User logged in successfully!');
        done();
      });
  });

  it('Should not login non-existing user', (done) => {
    const user = {
      email: 'us@example.com',
      password: 'user4',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('User not found');
        done();
      });
  });

  it('Should not login provided incorrect password', (done) => {
    const user = {
      email: 'user2@example.com',
      password: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Password do not match');
        done();
      });
  });
});
