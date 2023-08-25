/**
 * compare test suite
 * @task implement compare.mjs and tests as described
 * @level junior++, middle--
 * @estTime 2h-4h
 * @author https://plan9.tech
 */
import { it, test } from "node:test";
import assert from "node:assert";
import { suite } from "../lib.mjs";
import { compare } from "./compare.mjs";
//
let _id = 0;
const _doc = (data = {}) => {
	data._id = `${_id++}`;
	return data;
};
//
const docs = [];
docs.push(_doc({ profile: { age: 31, name: "Adriana Chechik" } }));
docs.push(_doc({ profile: { age: 23, name: "Hazel Moore" } }));
docs.push(_doc({ profile: { age: 32, name: "Stella Cox" } }));
//
const queryById = {
	_id: docs[0]._id,
};
const queryStrictByAgeInNestedObject = {
	"profile.age": 23,
};
const queryBy$gte = {
	"profile.age": { $gte: 30 },
};
const queryByNestedConditions = {
	$or: [{ "profile.age": 23 }, { "profile.age": { $gte: 32 } }],
};
//
suite("compare", (s) => {
	test("compare(docs[0], queryById) === true", (t) => {
		if(!compare(docs[0], queryById)) {
			throw new Error(`Failed: queryById`);
		}
	});
	test("compare(docs[1], queryStrictByAgeInNestedObject) === true", () => {
		if(!compare(docs[1], queryStrictByAgeInNestedObject)) {
			throw new Error(`Failed: queryStrictByAgeInNestedObject`);
		}
	});
	test("compare(docs[0], queryBy$gte) === true", () => {
		if(!compare(docs[0], queryBy$gte)) {
			throw new Error(`Failed: queryBy$gte`);
		}
	});
	test("compare(docs[0], queryByNestedConditions) === false", () => {
		if(compare(docs[0], queryByNestedConditions)) {
			throw new Error(`Failed: queryByNestedConditions`);
		}
	});
	test("compare(docs[1], queryByNestedConditions) === true", () => {
		if(!compare(docs[1], queryByNestedConditions)) {
			throw new Error(`Failed: queryByNestedConditions`);
		}
	});
	test("compare(docs[2], queryByNestedConditions) === true", () => {
		if(!compare(docs[2], queryByNestedConditions)) {
			throw new Error(`Failed: queryByNestedConditions`);
		}
	});
});
