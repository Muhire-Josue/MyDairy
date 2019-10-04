/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userToken from '../helpers/testToken';


chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('Entries test', () => {
  it('should add an entry', (done) => {
    const entry = {
      title: 'Tuestday morning',
      description: 'how intresting!',
    };

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('Entry successfully created');
        done();
      });
  });

  it('should not add an entry if user didnot signin', (done) => {
    const entry = {
      title: 'Tuestday morning',
      description: 'how intresting!',
    };

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });

  it('should not add an entry provided invalid token', (done) => {
    const entry = {
      title: 'Tuestday morning',
      description: 'how intresting!',
    };

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .set('Authorization', 'Bearer undefined')
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });

  it('should not add invalid input', (done) => {
    const entry = {
      title: 'Tuestday morning',
      descriptionsss: 'how intresting!',
    };

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });

  it('should get all entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        done();
      });
  });
});