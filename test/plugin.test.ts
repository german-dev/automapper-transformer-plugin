import tss from 'typescript/lib/tsserverlibrary';
import tsAutomapperPlugin from '../src';
import {
  userModelText,
  userModelTextStrict,
  userModelTranspiledText,
} from './fixtures/user.model';

describe('Plugin', () => {
  it('compile', () => {
    const tsConfig: tss.CompilerOptions = {
      module: tss.ModuleKind.CommonJS,
      target: tss.ScriptTarget.ESNext,
      noEmitHelpers: true,
    };

    const fileName = 'user.model.ts';
    const programFixture = tss.createProgram([fileName], tsConfig);

    const result = tss.transpileModule(userModelText, {
      compilerOptions: tsConfig,
      fileName,
      transformers: {
        before: [tsAutomapperPlugin(programFixture).before],
      },
    });
    expect(result.outputText).toBeTruthy();
    expect(result.outputText).toEqual(userModelTranspiledText);
  });

  it('compile strict', () => {
    const tsConfig: tss.CompilerOptions = {
      module: tss.ModuleKind.CommonJS,
      target: tss.ScriptTarget.ESNext,
      noEmitHelpers: true,
      strict: true,
    };

    const fileName = 'user.model.ts';
    const programFixture = tss.createProgram([fileName], tsConfig);

    const result = tss.transpileModule(userModelTextStrict, {
      compilerOptions: tsConfig,
      fileName,
      transformers: {
        before: [tsAutomapperPlugin(programFixture).before],
      },
    });
    expect(result.outputText).toBeTruthy();
    expect(result.outputText).toEqual(userModelTranspiledText);
  });
});
