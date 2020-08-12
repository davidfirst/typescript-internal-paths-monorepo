To reproduce:

1. symlink the comp1 into the node-modules of comp2
2. run `tsc` on comp1 then, `tsc` on comp2. The error you'll get is:
```
comp2.ts:5:14 - error TS2345: Argument of type 'import("/Users/davidfirst/temp/projects/ts-dist-bug/comp1/dist/comp1").Comp1' is not assignable to parameter of type 'import("/Users/davidfirst/temp/projects/ts-dist-bug/comp1/comp1").Comp1'.
  Types have separate declarations of a private property '_foo'.

5   printComp1(comp1);
               ~~~~~


Found 1 error.
```

To fix it, here are the options:
1. add to the package.json of comp1, `types: './index.ts'`. This way, it never goes to the d.ts
2. in the comp2.ts file change: `import { printComp1 } from 'comp1/comp1-helper';` to `import { printComp1 } from 'comp1/dist/comp1-helper';`.

The problem with option #2 is that if there are circular, ts will throw an error that the file in the dist dir doesn't exist.
