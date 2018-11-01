import createSampleChart from '@/sample.js'

describe('index.js', () => {
    test('Testing the module load', () => {
        expect(createSampleChart).toBeDefined()
    });
});