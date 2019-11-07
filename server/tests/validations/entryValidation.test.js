import chai from 'chai';
import entrySchema from '../../validations/entryValidation';
import mockData from '../data/mockData';

const entry = mockData[15];

describe('validation test', () => {
  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, title: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, title: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, title: undefined });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, description: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, description: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate', () => {
    const validateUser = entrySchema.validate({ ...entry, description: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
});
