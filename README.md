# Another Kaomoji Generator (*ﾉ▽ﾉ)

Kaomoji extractor and sender for the [Another Kaomoji](https://github.com/ablandel/another-kaomoji) project based
the [emoticon_kaomoji_dataset](https://github.com/ablandel/emoticon_kaomoji_dataset) dataset.

This repository contains two scripts to:

- extract the Kaomojis defined in the dataset (`extract.js`)
- send POST request to the [Another Kaomoji](https://github.com/ablandel/another-kaomoji) server (`send.js`)

This repository acts as Kaomoji generator to fake HTTP traffic and populate
the [Another Kaomoji](https://github.com/ablandel/another-kaomoji) database.

## Usage

Download the dataset from the fork.

```shell
curl -O https://raw.githubusercontent.com/ablandel/emoticon_kaomoji_dataset/main/emoticon_dict.json
```

Extract and filter the Kaomoji(s) defined in the dataset.

```shell
node extract.js
```

Send all the Kaomoji(s) to the [Another Kaomoji](https://github.com/ablandel/another-kaomoji) server.

```shell
node send.js
```
