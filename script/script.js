
function assertTrue(testFunction, functionParams) {
    let result = testFunction(functionParams);
    if (result == true) {
        return true;
    }
    throw `Expected true but got ${result}`;
}

function assertFalse(testFunction, functionParams) {
    let result = testFunction(functionParams);
    if (result == false) {
        return true;
    }
    throw `Expected false but got ${result}`;
}


function testEmailValidationSuccess() {
    // this tests for normal valid emails 
    let email = "simple@example.com";
    assertTrue(checkEmailValid, email);
    email = "firstname.lastname@example.com";
    assertTrue(checkEmailValid, email);
    email = "email@subdomain.example.com";
    assertTrue(checkEmailValid, email);
    email = "firstname+lastname@example.com";
    assertTrue(checkEmailValid, email);
    email = "email@123.123.123.123";
    assertTrue(checkEmailValid, email);
    email = "email@[123.123.123.123]";
    assertTrue(checkEmailValid, email);
    email = "1234567890@example.com";
    assertTrue(checkEmailValid, email);
    email = "email@example-one.com";
    assertTrue(checkEmailValid, email);
    email = "_______@example.com";
    assertTrue(checkEmailValid, email);
    email = "email@example.name";
    assertTrue(checkEmailValid, email);
    email = "email@example.museum";
    assertTrue(checkEmailValid, email);
    email = "email@example.co.jp";
    assertTrue(checkEmailValid, email);
    email = "firstname-lastname@example.com";
    assertTrue(checkEmailValid, email);
}

function testEmailValidationSuccess2() {
    // this tests for normal and not normal valid emails 
    let email = "simple@example.com";
    assertTrue(checkEmailValid, email);
    email = "very.common@example.com";
    assertTrue(checkEmailValid, email);
    email = "disposable.style.email.with+symbol@example.com";
    assertTrue(checkEmailValid, email);
    email = "other.email-with-hyphen@example.com";
    assertTrue(checkEmailValid, email);
    email = "fully-qualified-domain@example.com";
    assertTrue(checkEmailValid, email);
    email = "user.name+tag+sorting@example.com";
    assertTrue(checkEmailValid, email);
    email = "x@example.com";
    assertTrue(checkEmailValid, email);
    email = "example-indeed@strange-example.com";
    assertTrue(checkEmailValid, email);
    email = "test/test@test.com";
    assertTrue(checkEmailValid, email);
    email = "admin@mailserver1";
    assertTrue(checkEmailValid, email);
    email = "example@s.example";
    assertTrue(checkEmailValid, email);
    email = '" "@example.org';
    assertTrue(checkEmailValid, email);
    email = '"john..doe"@example.org';
    assertTrue(checkEmailValid, email);
    email = "mailhost!username@example.org";
    assertTrue(checkEmailValid, email);
    email = "user%example.com@example.org";
    assertTrue(checkEmailValid, email);
    email = "user-@example.org";
    assertTrue(checkEmailValid, email);
    email = "postmaster@[123.123.123.123]";
    assertTrue(checkEmailValid, email);
    email = "postmaster@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]";
    assertTrue(checkEmailValid, email);
    // this one will faile because there is "@" in quotes and the function checkes for more than one "@"
    email = '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com';
    assertTrue(checkEmailValid, email);
}

function testEmailValidationFail() {
    // this tests invalid emails
    let email = "Abc.example.com";
    assertFalse(checkEmailValid, email);
    email = "A@b@c@example.com";
    assertFalse(checkEmailValid, email);
    email = "mySite@.com.my";
    assertFalse(checkEmailValid, email);
    email = "@you.me.net";
    assertFalse(checkEmailValid, email);
    email = ".mysite@mysite.org";
    assertFalse(checkEmailValid, email);
    email = "mysite..1234@yahoo.com";
    assertFalse(checkEmailValid, email);
    email = 'a"b(c)d,e:f;g<h>i[j\k]l@example.com';
    assertFalse(checkEmailValid, email);
    email = 'just"not"right@example.com';
    assertFalse(checkEmailValid, email);
    email = 'this is"not\allowed@example.com';
    assertFalse(checkEmailValid, email);
    email = 'this\ still\"not\\allowed@example.com';
    assertFalse(checkEmailValid, email);
    email = '1234567890123456789012345678901234567890123456789012345678901234+x@example.com';
    assertFalse(checkEmailValid, email);
    email = 'i_like_underscore@but_its_not_allowed_in_this_part.example.com';
    assertFalse(checkEmailValid, email);
}

function runTest() {
    try {
        testEmailValidationSuccess();
        console.log("Test 1 successful");
    } catch (error) {
        console.log("the test testEmailValidationSuccess has FAILED!");
        console.log(">>> " + error);
    }

    try {
        testEmailValidationSuccess2();
        console.log("Test 2 successful");
    } catch (error) {
        console.log("the test testEmailValidationSuccess2 has FAILED!");
        console.log(">>> " + error);
    }

    try {
        testEmailValidationFail();
        console.log("Test 3 successful");
    } catch (error) {
        console.log("the test testEmailValidationFail has FAILED!");
        console.log(">>> " + error);
    }
    console.log("done");
}

runTest();



//! *********************************************************************************/

/**
 * still need to check for double quotes
 */
function checkEmailValid(email) {
    let atIndex = [];

    for (let i = 0; i < email.length; i++) {
        if (email[i] == "@") atIndex.push(i);
    }
    if (atIndex.length != 1) return false; // cant have more than one @
    if (atIndex[0] == 0) return false; // cant have @ at the start of the email

    if (email[0] == ".") return false; // email cant start with a dot "."


    let splittedEmail = email.split("@");
    if (splittedEmail[splittedEmail.length - 1][0] == ".") return false; // domain cant start with a dot "."

    let doubleQuoted = false;
    if (splittedEmail[0][0] == "\"" && splittedEmail[0][splittedEmail[0].length - 1] == "\"") doubleQuoted = true;

    for (let i = 0; i < splittedEmail[splittedEmail.length - 1].length - 1; i++) { // cant have two dots ".." one after the other 
        if (splittedEmail[splittedEmail.length - 1][i] == "." && splittedEmail[splittedEmail.length - 1][i + 1] == ".") return false;
    }

    for (let i = 0; i < splittedEmail[0].length - 1; i++) { // cant have two dots ".." one after the other 
        if ((splittedEmail[0][i] == "." && splittedEmail[0][i + 1] == ".") && !doubleQuoted) return false;
    }

    let testCh;
    for (let i = 0; i < splittedEmail[0].length; i++) {
        testCh = splittedEmail[0][i];
        if ((testCh == "\"" ||
            testCh == "," ||
            testCh == ":" ||
            testCh == "(" ||
            testCh == ")" ||
            testCh == ";" ||
            testCh == "<" ||
            testCh == ">" ||
            testCh == "[" ||
            testCh == "]" ||
            testCh == " " ||
            testCh == "\\") && !doubleQuoted) return false;
    }
    if (splittedEmail[0].length > 64) return false;

    // cant have "_" in the domain
    for (let i = 0; i < splittedEmail[0].length; i++) {
        testCh = splittedEmail[splittedEmail.length - 1][i];
        if (testCh == "_") return false;
    }

    return true;
}