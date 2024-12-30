"use server";

import { Parser } from "xml2js";

export const getPosts = async () => {
  const parser = new Parser({
    // true にすると、それぞれの値が配列になってしまうので false にしておく
    explicitArray: false,
    // 前後の空句を取り除く
    trim: true,
  });

  const response = await fetch("https://zenn.dev/topics/nextjs/feed", {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });

  // xml を string としてに変換
  const xmlString = await response.text();

  // xml を json に変換 generics型を使えないので as で型をキャスト
  const data = await parser.parseStringPromise(xmlString);

  return data;
};
