import chai from 'chai';
import entrySchema from '../../validations/entryValidation';
import mockData from '../data/mockData';

const entry = mockData[15];

describe('validation test', () => {
  it('Should validate empty title', () => {
    const validateUser = entrySchema.validate({ ...entry, title: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the data type of the title', () => {
    const validateUser = entrySchema.validate({ ...entry, title: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate required title', () => {
    const validateUser = entrySchema.validate({ ...entry, title: undefined });
    chai.expect(validateUser).to.have.property('error');
  });

  it('Should validate empty description', () => {
    const validateUser = entrySchema.validate({ ...entry, description: '' });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate the data type of the description', () => {
    const validateUser = entrySchema.validate({ ...entry, description: [] });
    chai.expect(validateUser).to.have.property('error');
  });
  it('Should validate required description', () => {
    const validateUser = entrySchema.validate({ ...entry, description: undefined });
    chai.expect(validateUser).to.have.property('error');
  });
});
