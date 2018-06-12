import { expect } from 'chai';
import * as sinon from 'sinon';
import * as fs from 'fs';
const spawnStub = sinon.stub().returns({
  stdout: {
    on: () => true
  }
});
require('child_process').spawn = spawnStub;
import Macro from '../src/Macro';
import * as gkm from 'gkm';
import { spawn } from 'child_process';

describe('Macro', () => {
  it('Should correctly record inputs', (done) => {
    const saveMacroStub = sinon.stub(fs, 'writeFileSync');
    const macro = new Macro();

    macro.record('t3');

    setTimeout(
      () => gkm.events.emit('key.pressed', ['Pause']),
      100
    );
    setTimeout(
      () => gkm.events.emit('mouse.moved', ['1231,444']),
      250
    );
    setTimeout(
      () => gkm.events.emit('key.pressed', ['1231,444']),
      260
    );
    setTimeout(
      () => gkm.events.emit('key.released', ['1231,444']),
      270
    );
    setTimeout(
      () => gkm.events.emit('mouse.click', ['1231,444']),
      280
    );
    setTimeout(
      () => gkm.events.emit('mouse.pressed', ['1231,444']),
      290
    );
    setTimeout(
      () => gkm.events.emit('mouse.released', ['1231,444']),
      300
    );
    setTimeout(
      () => gkm.events.emit('mouse.dragged', ['1231,444']),
      310
    );
    setTimeout(
      () => gkm.events.emit('mouse.wheel.moved', ['1231,444']),
      589
    );
    setTimeout(
      () => gkm.events.emit('key.pressed', ['Pause']),
      650
    );
    setTimeout(
      () => gkm.events.emit('mouse.wheel.moved', ['1231,444']),
      700
    );

    setTimeout(
      () => {
        const macroFileName = saveMacroStub.args[0][0];
        const macroJson = JSON.parse(saveMacroStub.args[0][1]);

        expect(macroFileName.includes('.macrocli/t3.json')).to.equal(true, 'Macro file name');
        console.log(macroJson);
        expect(macroJson.length).to.be.equal(16, 'Recorded input length');

        expect(macroJson[0].name).to.equal('Time', 'Wait time');
        expect(macroJson[0].data[0]).to.be.closeTo(145, 5, 'Wait time');

        expect(macroJson[1].name).to.equal('mouse.moved', 'Mouse moved');
        expect(macroJson[1].data[0]).to.equal('1231,444', 'Mouse moved');

        expect(macroJson[2].name).to.equal('Time', 'Wait time');
        expect(macroJson[2].data[0]).to.be.closeTo(10, 5, 'Wait time');
        
        done();
      },
      1000
    );
  });
});
