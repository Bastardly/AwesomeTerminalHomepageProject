import { expect } from 'chai';
import { getHashAndQuery } from './cd'

describe('Commands', function() {
  describe('cd', function() {
    describe('getHashAndQuery', function() {
        
        it('should return url Hash correctly', function() {
            const url = 'path/subpath#meHash'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).to.equal('meHash');
            expect(query).to.equal('');
        });
        
        it('should return url Query correctly', function() {
            const url = 'path/subpath?me=question'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).to.equal('');
            expect(query).to.equal('me=question');
        });
        it('should get url Hash And Query correctly', function() {
            const url = 'path/subpath#meHash?me=question'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).to.equal('meHash');
            expect(query).to.equal('me=question');
        });
        it('should get url Hash And Query correctly when written reverse', function() {
            const url = 'path/subpath?me=question#meHash'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).to.equal('meHash');
            expect(query).to.equal('me=question');
        });
    });
  });
});