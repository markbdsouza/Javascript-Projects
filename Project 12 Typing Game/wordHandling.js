const LIST_OF_PARAGRAPHS = [
  // `Trying to make a wise, good choice when thinking about what kinds of careers might be best for you is a hard thing to do.`,
  `Trying to make a wise, good choice when thinking about what kinds of careers might be best for you is a hard thing to do. Your future may very well depend on the ways you go about finding the best job openings for you in the world of work. Some people will feel that there is one and only one job in the world for them. Hard thinking and a lot of hard work will help them find the one job that is best for them. Jobs are there for those with skills and a good work ethic. Many new young artists in the upper New England states are famous around the world as leaders in new American art. These fine artists are very good in their chosen fields and are willing to share their many talents by teaching others. The students have had the chance to learn and use skills in oil painting, sketching with chalk, sculpting, and weaving. Learning to typewrite is a skill that will help all of us in our work today. The development of the computer will open doors for people with the keyboarding skills and will make typing a necessity. Managers, as well as secretaries, will need skill at the keyboard to input data and process words. Therefore, good keyboarding skills may be important to you.`,

  // `The cognitive characteristics of paragraph comprehension items were studied by comparing models that`,
  `The cognitive characteristics of paragraph comprehension items were studied by comparing models that deal with two general processing stages: text representation and response decision. The models that were compared included the prepositional structure of the text (Kintsch & van Dijk, 1978), various counts of surface structure variables and word frequency (Drum et al., 1981), a taxonomy of levels of text questions (Anderson, 1972), and some new models that combine features of these models. Calibrations from the linear logistic latent trait model allowed evaluation of the impact of the cognitive variables on item responses. The results indicate that successful prediction of item difficulty is obtained from models with wide representation of both text and decision processing. This suggests that items can be screened for processing difficulty prior to being administered to examinees. However, the results also have important implications for test validity in that the two processing stages involve two different ability dimensions.`,

  // `The word euthanasia is of Greek origin and literally means "a good death." The American`,
  `The word euthanasia is of Greek origin and literally means "a good death." The American Heritage Dictionary defines it as "the act of killing a person painlessly for reasons of mercy." Such killing can be done through active means, such as administering a lethal injection, or by passive means, such as withholding medical care or food and water. In recent years in the United States, there have been numerous cases of active euthanasia in the news. They usually involve the deliberate killing of ill or incapacitated persons by relatives or friends who plead that they can no longer bear to see their loved ones suffer. Although such killings are a crime, the perpetrators are often dealt with leniently by our legal system, and the media usually portrays them as compassionate heroes who take personal risks to save another from unbearable suffering.`,

  // `Autism spectrum disorders (ASD) are a range of psychological conditions characterized by`,
  `Autism spectrum disorders (ASD) are a range of psychological conditions characterized by abnormalities in social interaction, behavior, interests, and communication. The five forms of ASD include classical autism, Asperger syndrome, Pervasive Developmental Disorder, Rett syndrome, and Childhood Disintegrative Disorder. Although the number of reported cases of ASD has experienced a dramatic increase in the past 25 years, the majority of doctors agree that this increase is due to changes in diagnostic practices and advances in the understanding of psychiatric health. While there is no general consensus among medical professionals about the underlying causes of ASD, theories range from genetic inheritance to environmental factors. One of the most controversial theories to have emerged in recent times is the hypothesis that ASD could be caused by the MMR vaccine, which is an immunization against measles, mumps, and rubella that was first developed in the 1960’s.`,

  `Nature writing is nonfiction or fiction prose or poetry about the natural environment. Nature writing encompasses a wide variety of works, ranging from those that place primary emphasis on natural history facts (such as field guides) to those in which philosophical interpretation predominate. It includes natural history essays, poetry, essays of solitude or escape, as well as travel and adventure writing.`,
];

const typerSettings = {
  alphabetTyper: {
    value: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    difficulty: { easy: 2, medium: 1, hard: 0 },
    returnParagraph() {
      return this.value;
    },
  },
  paraTyper: {
    value: LIST_OF_PARAGRAPHS,
    difficulty: { easy: 5, medium: 3, hard: 1 },
    returnParagraph() {
      return this.value[Math.floor(Math.random() * this.value.length)];
    },
  },
  wordTyper: {
    value: LIST_OF_PARAGRAPHS,
    returnInfiniteModeWords() {
      return Array.from(new Set(this.value.join(' ').split(' '))).filter(
        (word) => word.length > 3
      );
    },
    pickRandomWord() {
      const length = paragraphList['ParaTyper'].returnInfiniteModeWords()
        .length;
      return paragraphList['ParaTyper'].returnInfiniteModeWords()[
        Math.floor(Math.random() * length)
      ];
    },
  },
};
