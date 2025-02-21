import test from 'ava';
import { installFix, uninstallFix } from './index.js';

// Test default behaviour
try {
  throw new Error('Test default error');
} catch (error) {
  test('By default error.stack includes PWD', t => {
    t.true(error.stack.includes(process.env.PWD));
  });

  test("By default error.stack includes 'file:///'", t => {
    t.true(error.stack.includes('file:///'));
  });
}


// Test behaviour after installFix
try {
  installFix();
  throw new Error('Test error');
} catch (error) {
  const fixedStack = error.stack;

  test("After install error.stack doesn't includes PWD", t => {
    t.false(fixedStack.includes(process.env.PWD));
  });

  test("After install error.stack doesn't includes 'file:///'", t => {
    t.false(fixedStack.includes('file:\\'));
  });

  test("After install error.stack includes './'", t => {
    t.true(fixedStack.includes('./'));
 });


}
finally {
  uninstallFix();

  // Test behaviour after uninstallFix
  try {
    throw new Error('Test uninstall error');
  } catch (error) {
    test('After uninstall error.stack includes PWD', t => {
      t.true(error.stack.includes(process.env.PWD));
    });

    test("After uninstall error.stack includes 'file:///'", t => {
      t.true(error.stack.includes('file:///'));
    });
  }
}


try {
  installFix();
  installFix();
} catch (error) {
  test("Can't installFix twice", t => {
    t.is(error.message, 'You can\'t installFix twice');
  });
}
finally {
  uninstallFix();
}



try {
  uninstallFix();
} catch (error) {
  test("You need to installFix before uninstallFix", t => {
    t.is(error.message, "You need to installFix before uninstallFix and can't uninstallFix twice");
  });
}

try {
  installFix();
  uninstallFix();
  uninstallFix();
} catch (error) {
  test("You can't uninstallFix twice", t => {
    t.is(error.message, "You need to installFix before uninstallFix and can't uninstallFix twice");
  });
}




