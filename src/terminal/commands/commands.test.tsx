import React, { ReactNode } from 'react';
import cd, { getHashAndQuery } from './cd';
import { getRouteData, RouteData } from '../../router';
import { getElements } from '../../terminal';

type RunCdQuery = {
    routeData: RouteData;
    errorMsg: string;
}

function runCdQuery(query: string): RunCdQuery {
    let routeData: RouteData;
    let errorMsg: string;

    const mockGoodiebag = ({
        getRouteData,
        setInputValue: (s: string) => s,
        changeRouteData: (val: RouteData) => routeData = val, // So we can test the callback result
        setErrorMsg: (err: string) => errorMsg = err,
    })
    const elements = getElements(query);
    // @ts-ignore -  For the sake of the test, our methods have been changed
    cd(elements, mockGoodiebag) // normally not a callback
    // @ts-ignore - We want this callback you silly thing
    return ({routeData, errorMsg});
}

describe('Commands', function() {
  describe('cd', function() {

    it('should render routaData url correctly 1', function() {
        const { routeData } = runCdQuery('cd blog')
        expect(routeData.url).toBe('/blog');
    });
    it('should render routaData url correctly 2', function() {
        const { routeData } = runCdQuery('cd blog/')
        expect(routeData.url).toBe('/blog');
    });
    it('should set routaData url to /404', function() {
        const { routeData } = runCdQuery('cd meDoNeverExistLordVoldemort')
        expect(routeData.url).toBe('/404');
    });
    it('should return invalid url error message', function() {
        const { errorMsg } = runCdQuery('cd blog#hash/invalid')
        expect(errorMsg).toBe('You can only use a hash on the last item.');
    });
    it('should return two error messages', function() {
        const { errorMsg } = runCdQuery('cd blog#ha?sh/invalid')
        expect(errorMsg).toBe('You can only use a hash on the last item. You can only use a query on the last item.');
    });
    it('should return error message if two hashes are used messages', function() {
        const { errorMsg } = runCdQuery('cd blog/valid##hashieDashie')
        expect(errorMsg).toBe('You can only use one hash tag.');
    });
    
    it('should return error message if two query tags are used messages', function() {
        const { errorMsg } = runCdQuery('cd blog/valid??hashieDashie')
        expect(errorMsg).toBe('You can only use one query tag.');
    });


 
    describe('getHashAndQuery', function() {
        
        it('should return url Hash correctly', function() {
            const url = 'path/subpath#meHash'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).toBe('meHash');
            expect(query).toBe('');
        });
        
        it('should return url Query correctly', function() {
            const url = 'path/subpath?me=question'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).toBe('');
            expect(query).toBe('me=question');
        });
        it('should get url Hash And Query correctly', function() {
            const url = 'path/subpath#meHash?me=question'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).toBe('meHash');
            expect(query).toBe('me=question');
        });
        it('should get url Hash And Query correctly when written reverse', function() {
            const url = 'path/subpath?me=question#meHash'
            const { hash, query } = getHashAndQuery(url)
            expect(hash).toBe('meHash');
            expect(query).toBe('me=question');
        });
    });
  });
});