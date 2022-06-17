"use strict";

const data = [
  {
    id: 1,
    question:
      'What will be the output of the following code snippet?\n```html\n<script type="text/javascript">\na = 5 + "9";\ndocument.write(a);\n</script>\n```',
    options: ["Compilation error", "14", "Runtime error", "59"],
    answer: 4,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:02:31.490Z",
    updatedAt: "2022-06-17T07:02:31.490Z",
  },
  {
    id: 2,
    question:
      'What will be the output of the following code snippet?\n```js\n<script type="text/javascript" language="javascript">\n  \nvar a = "Scaler";\nvar result = a.substring(2, 4);\ndocument.write(result);\n  \n</script>\n```',
    options: ["al", "ale", "cal", "caler"],
    answer: 1,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:04:06.746Z",
    updatedAt: "2022-06-17T07:04:06.746Z",
  },
  {
    id: 3,
    question:
      'What will be the output of the following code snippet?\n```html\n<script type="text/javascript" language="javascript">\n \nvar x=12;\nvar y=8;\nvar res=eval("x+y");\ndocument.write(res);\n \n</script>\n```',
    options: ["20", "x+y", "128", "None of the above"],
    answer: 1,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:05:42.026Z",
    updatedAt: "2022-06-17T07:05:42.026Z",
  },
  {
    id: 4,
    question:
      "What will be the output of the following code snippet?\n```js\n(function(){\n setTimeout(()=> console.log(1),2000);\n console.log(2);\n setTimeout(()=> console.log(3),0);\n console.log(4);\n})();\n```",
    options: ["1 2 3 4", "2 3 4 1", "2 4 3 1", "4 3 2 1"],
    answer: 3,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:07:03.660Z",
    updatedAt: "2022-06-17T07:07:03.660Z",
  },
  {
    id: 5,
    question:
      "What will be the output of the following code snippet?\n```js\n(function(a){\n return (function(){\n   console.log(a);\n   a = 6;\n })()\n})(21);\n```",
    options: ["6", "NaN", "21", "None of the above"],
    answer: 3,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:08:49.781Z",
    updatedAt: "2022-06-17T07:08:49.781Z",
  },
  {
    id: 6,
    question:
      "```js\nvar a = Math.max();\nvar b = Math.min();\nprint(a);\nprint(b);\n```",
    options: [
      "Infinity -Infinity",
      "-Infinity Infinity",
      "Infinity Infinity",
      "-Infinity -Infinity",
    ],
    answer: 2,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:10:59.190Z",
    updatedAt: "2022-06-17T07:10:59.190Z",
  },
  {
    id: 7,
    question:
      " \nWhat will be the output of the following code snippet?\n```js\nvar a = true + true + true * 3;\nprint(a)\n```",
    options: ["3", "0", "Error", "5"],
    answer: 4,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:11:55.654Z",
    updatedAt: "2022-06-17T07:11:55.654Z",
  },
  {
    id: 8,
    question: "```js\ntypeof(NaN)\n```",
    options: ["Object", "Number", "Undefined", "String"],
    answer: 2,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:13:30.697Z",
    updatedAt: "2022-06-17T07:13:30.697Z",
  },
  {
    id: 9,
    question:
      "What will be the output of following snippet?\n```js\nfunction arrayFromValue(item) {\n  return\n    [item];\n}\narrayFromValue(10);\n```",
    options: ["null", "[10]", "undefined", "None of the above"],
    answer: 3,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:18:03.581Z",
    updatedAt: "2022-06-17T07:18:03.581Z",
  },
  {
    id: 10,
    question:
      "What will be the output of following snippet?\n```js\nlet i;\nfor (i = 0; i < 3; i++) {\n  const log = () => {\n    console.log(i);\n  }\n  setTimeout(log, 100);\n}\n```",
    options: [
      "1 2 3",
      "3 3 3",
      "undefined undefined undefined",
      "None of the above",
    ],
    answer: 2,
    pollId: "9a251b00-1f88-4376-b25b-b9d412b00dd4",
    createdAt: "2022-06-17T07:21:12.540Z",
    updatedAt: "2022-06-17T07:21:12.540Z",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("questions", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("questions", null, {});
  },
};
