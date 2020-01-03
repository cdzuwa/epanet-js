import { Project, Workspace } from '../../src';
import { CountType } from '../../src/enum';

const fs = require('fs');

const net1 = fs.readFileSync(__dirname + '/../data/net1.inp', 'utf8');
const ws = new Workspace();

describe('Epanet Project Functions', () => {
  describe('Error Catching', () => {
    test('throw with bad properties', () => {
      function catchError() {
        const model = new Project(ws);
        model.init('repor{/st.rpt', 'ou{/t.bin', 0, 0);
      }

      expect(catchError).toThrow('303');
    });
  });
  describe('Impliment Methods', () => {
    test('run an existing project', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.runproject('net1.inp', 'report.rpt', 'out.bin');
      // Todo: Value from hydraulic run
      expect(1).toEqual(1);
    });
    test('set and get title', () => {
      const model = new Project(ws);
      model.init('report.rpt', 'out.bin', 0, 0);
      model.settitle('Title 1', 'Title Line 2', '');
      const { line1, line2, line3 } = model.gettitle();

      expect(line1).toEqual('Title 1');
      expect(line2).toEqual('Title Line 2');
      expect(line3).toEqual('');
    });
    test('get the counts of an existing project', () => {
      ws.writeFile('net1.inp', net1);
      const model = new Project(ws);
      model.open('net1.inp', 'report.rpt', 'out.bin');
      const nodeCount = model.getcount(CountType.NodeCount);
      const linkCount = model.getcount(CountType.LinkCount);

      expect(nodeCount).toEqual(11);
      expect(linkCount).toEqual(13);
    });
  });
});