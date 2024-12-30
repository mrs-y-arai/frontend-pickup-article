"use server";

import { Parser } from "xml2js";

export const getPosts = async (queries: string[]) => {
  const parser = new Parser({
    // true にすると、それぞれの値が配列になってしまうので false にしておく
    explicitArray: false,
    // 前後の空句を取り除く
    trim: true,
  });

  const articleList = await Promise.all(
    queries.map(async (item) => {
      const response = await fetch(`https://zenn.dev/topics/${item}/feed`, {
        headers: {
          "Content-Type": "application/rss+xml",
        },
        next: {
          revalidate: 86400, // 24時間 = 86400秒
        },
      });
      // xml を string としてに変換
      const xmlString = await response.text();

      // xml を json に変換 generics型を使えないので as で型をキャスト
      const data = await parser.parseStringPromise(xmlString);
      return data.rss.channel.item.filter((item: any) => {
        return {
          title: item.title,
          description: item.description,
          href: item.link,
          pubDate: item.pubDate,
        };
      });
    })
  );

  const flattedArticleList = articleList.flat();

  const sortedArticleList = sortPosts(flattedArticleList);

  const map = new Map();
  sortedArticleList.flat().forEach((item: any) => {
    if (!map.has(item.link)) {
      map.set(item.link, {
        title: item.title,
        description: item.description,
        href: item.link,
      });
    }
  });

  return map;
};

const sortPosts = (posts: any) => {
  return posts.sort((a: any, b: any) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
};
