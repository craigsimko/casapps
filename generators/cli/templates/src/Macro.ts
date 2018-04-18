import * as gkm from 'gkm';
import * as fs from 'fs';
import * as q from 'q';
import * as GlobalInputRecorder from 'global-input-recorder';
import * as GlobalInputSender from 'global-input-sender';
import 'console.table';

class Macro {
  private macroDirectory: string;
  private recording: boolean;
  private inputRecorder: GlobalInputRecorder;
  private inputSenders = {};

  constructor() {
    this.inputRecorder = new GlobalInputRecorder();
    this.macroDirectory = this.getMacroDirectory();
    this.recording = false;
  }

  /**
   * Starts recording input.
   */
  public record(macroName) {
    const deferred = q.defer();
    gkm.events.on('key.pressed', (data) => {
      if (data[0] === 'Pause') {
        if (this.recording) {
          console.log('Stopped');
          this.stopRecording(macroName);
          deferred.resolve(macroName);
        } else {
          console.log('Recording...');
          this.startRecording();
        }
      }
    });
    return deferred.promise;
  }

  /**
   * Runs specified macro
   */
  public run(macroName): Promise<any> {
    const macroFile = `${this.getMacroDirectory()}/${macroName}.json`;
    let inputChain = fs.readFileSync(macroFile, 'utf8');
    inputChain = JSON.parse(inputChain);
    const inputSender = new GlobalInputSender(inputChain);
    return inputSender.run();
  }

  /**
   * Lists available macros
   */
  public list() {
    const files = fs.readdirSync(this.macroDirectory);
    const macros = files.map((file) => {
      return {
        macro: file.replace('.json', '')
      };
    });
    console.table(macros);
  }

  /**
   * Deletes the specified macro
   */
  public delete(macroName: string) {
    const file = `${this.macroDirectory}/${macroName}.json`;
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      return true;
    }
    return false;
  }

  /**
   * 
   */
  private startRecording() {
    this.recording = true;
    this.inputRecorder.clear();
    this.inputRecorder.record();
  }

  /**
   * 
   */
  private stopRecording(macroName: string) {
    this.recording = false;
    this.inputRecorder.stop();
    this.saveMacro(macroName);
  }

  /**
   * Saves the input from this.inputRecorder to a json file with macroName
   * @param macroName string
   */
  private saveMacro(macroName: string) {
    if (!fs.existsSync(this.macroDirectory)) {
      fs.mkdirSync(this.macroDirectory);
    }
    fs.writeFileSync(
      `${this.macroDirectory}/${macroName}.json`,
      JSON.stringify(this.inputRecorder.input)
    );
  }

  /**
   * Returns the OS directory appended with '/.macrocli'
   * @returns directory string
   */
  private getMacroDirectory(): string {
    let dir = '';
    if (process.env.APPDATA) {
      dir = process.env.APPDATA;
    } else if (process.platform === 'darwin') {
      dir = process.env.HOME + 'Library/Preferences';
    } else {
      dir = '/var/local';
    }
    return dir + '/.macrocli';
  }
}

export default Macro;
