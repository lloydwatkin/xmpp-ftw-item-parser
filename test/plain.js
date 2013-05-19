require('mocha')
require('should')

var parser = require('../src/plain')
  , ltx    = require('ltx')

describe('Parsing posts with \'plain\'', function() {

    var item = ltx.parse('<item><body>This is <i>some</i> text</body></item>')

    it('shouldn\'t act if entity has data', function() {
        var entity = { not: 'empty' }
        parser.parse(item, entity)
        entity.should.eql({ not: 'empty' })
    })

    it('should add text from body element', function() {
        var entity = {}
        parser.parse(item, entity)
        entity.body.should.equal('This is <i>some</i> text')
    })

    it('shouldn\'t throw exception if missing expected element', function() {
        var entity = {}
        var badItem = ltx.parse('<item/>')
        parser.parse(badItem, entity)
        entity.should.eql({})
    })
})

describe('Building stanzas with \'plain\'', function() {

    it('shouldn\'t attempt to build element if already built', function() {
        var data = 'Marty McFly'
        var p = { payload: 'Doc Brown' }
        parser.build(data, p)
        p.payload.should.equal('Doc Brown')
    })

    it('should build expected element', function() {
        var data = 'Back to the future'
        var p = {}
        parser.build(data, p)
        p.payload.toString().should.equal('<body>' + data + '</body>')
    })
})
