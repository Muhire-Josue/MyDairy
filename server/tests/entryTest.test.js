/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userToken from '../helpers/testToken';


chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const otherUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJ1c2VyQGV4YWwuY29tIiwiaWF0IjoxNTcxMTM0NjM4fQ.9cMfWzA9IVUTzoJLjd3x7C_zILKHdQAiJz5e0b9lmIM';

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
        // return console.log('======>', Entry);
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

  it('should be able to get an entry', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        done();
      });
  });

  it('should not be able to get other users entry', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
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

  it('should not get an entry provided non-existing id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/100')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Entry not found');
        done();
      });
  });

  it('should not get an entry provided invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/abc')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Please provide a valid id');
        done();
      });
  });

  it('should modify an entry', (done) => {
    const entry = {
      title: 'friday morning',
      description: 'how intresting!!!',
    };

    chai.request(server)
      .patch('/api/v1/entries/1')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Entry successfully edited!');
        done();
      });
  });

  it('should not modify an entry of other users', (done) => {
    const entry = {
      title: 'friday morning',
      description: 'how intresting!!!',
    };

    chai.request(server)
      .patch('/api/v1/entries/1')
      .send(entry)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
        expect(res.body.error).to.equal('Operation forbiden');
        done();
      });
  });

  it('should not modify an entry provided invalid id', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/abc')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Please provide a valid id');
        done();
      });
  });

  it('should not modify an entry provided non-existing id', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/100')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Entry not found');
        done();
      });
  });

  it('should not modify entry provided invalid input', (done) => {
    const entry = {
      title: 'Tuestday morning',
      descriptionsss: 'how intresting!',
    };

    chai.request(server)
      .patch('/api/v1/entries/1')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });

  it('should not delete an entry of other users', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
        expect(res.body.error).to.equal('Operation forbiden');
        done();
      });
  });

  it('should delete an entry', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(204);
        expect(res.body.message).to.equal('Entry successfully deleted!');
        done();
      });
  });
  it('should not delete an entry provided non-existing id', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/100')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Entry not found');
        done();
      });
  });

  it('should not delete an entry provided invalid id', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/abc')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Please provide a valid id');
        done();
      });
  });
});
