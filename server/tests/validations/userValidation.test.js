import chai from 'chai';
import userSchema from '../../validations/userValidation';
import mockData from '../data/mockData';

const user = mockData[16];

describe('validation test', () => {
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, firstname: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, firstname: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, firstname: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, firstname: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, lastname: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, lastname: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, lastname: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, lastname: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, email: '' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, email: undefined });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, email: 123 });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, email: 'josue' });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, password: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, password: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, password: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = userSchema.validate({ ...user, password: 'j' });
    chai.expect(validateUser).to.have.property('error');
  });
});
