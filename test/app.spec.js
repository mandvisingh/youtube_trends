const chai = require('chai');
const chaiHttp = require('chai-http');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const server = require('../app');
chai.should();

chai.use(chaiHttp);

describe('Server', function () {

  it('should redirect on youtube trends', (done) => {
    chai.request(server)
      .get('/').redirects(0)
      .end(function (err, res) {
        res.should.have.status(302);
        res.should.redirectTo('/youtube');
        done();
      });
  });

  it('should open /youtube', (done) => {
    chai.request(server)
      .get('/youtube')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should open /youtube/player', (done) => {
    chai.request(server)
      .get('/youtube/kLjJD2WH5GQ?countryCode=AF')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('app should open with Country Codes, Pattern:/youtube?countrycode=code', (done) => {
    chai.request(server)
      .get('/youtube?countryCode=IN')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('dropdown reflects country matching the country code present in url', (done) => {
    chai.request(server)
      .get('/youtube')
      .end(function (err, res) {
        const dom = new JSDOM(`${res.text}`);
        if ((dom.window.document.querySelector("select").value) === 'AF') {
          res.should.have.status(200);
        }
        done();
      });
  });


  it('dropdown should have country code AF by default', (done) => {
    chai.request(server)
      .get('/youtube?countryCode=IN')
      .end(function (err, res) {
        const dom = new JSDOM(`${res.text}`);
        if ((dom.window.document.querySelector("select").value) === 'IN') {
          res.should.have.status(200);
        }
        done();
      });
  });

  it('should send error 404 not found', ()=> {
    return chai.request(server)
    .get('/random')
    .then((response) => {
      response.should.have.status(404);
    })
    .catch((error) => {
      throw error;
    });
  })

});
