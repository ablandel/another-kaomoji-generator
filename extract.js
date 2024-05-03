const fs = require('fs');

// Extracted from https://github.com/ekohrt/emoticon_kaomoji_dataset/blob/main/emoticon_dict.json
const data = fs.readFileSync("emoticon_dict.json", 'utf8');
const content = JSON.parse(data);

// Filter the kaomojis which do not have new tags.
const filteredContent = Object.fromEntries(
    Object.entries(content).filter(([key, value]) => value.new_tags.length > 0)
);

// Write the filtered content into the disk.
fs.writeFile("emoticon_dict_filtered.json", JSON.stringify(filteredContent, null, 2), (err) => {
  if (err) {
    throw new Error('Error writing file: ' + err);
  }
});

// Transform the kaomoji object DTO to the `another-kaomoji` DTO.
let index = 0;
const kaomojiDtos = [];
for (const key in filteredContent) {
    const tags = filteredContent[key].new_tags;
    const tagsDtos = []
    for (const tag of tags) {
        tagsDtos.push({
            label: tag
        });
    }
    kaomojiDtos.push({
        key: tags.sort().join("_") + "_" + index,
        emoticon: key,
        tags: tagsDtos
    });
    index++;
}

// Write the `kaomoji-spring-kt` DTOs into the disk.
fs.writeFile("kaomojis.json", JSON.stringify(kaomojiDtos, null, 2), (err) => {
  if (err) {
    throw new Error('Error writing file: ' + err);
  }
});