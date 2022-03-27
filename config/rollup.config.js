import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import json from '@rollup/plugin-json';

import pkg from '../package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  plugins: [
    resolve({ extensions, preferBuiltins: true }),
    json(),
    commonjs(),
    preserveShebangs(),
    typescript(),
  ],
};
