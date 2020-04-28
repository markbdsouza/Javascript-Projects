const LIST_OF_PARAGRAPHS = [
  `Trying to make a wise, good choice when thinking about what kinds of careers might be best for you is a hard thing to do. Your future may very well depend on the ways you go about finding the best job openings for you in the world of work. Some people will feel that there is one and only one job in the world for them. Hard thinking and a lot of hard work will help them find the one job that is best for them. Jobs are there for those with skills and a good work ethic. Many new young artists in the upper New England states are famous around the world as leaders in new American art. These fine artists are very good in their chosen fields and are willing to share their many talents by teaching others. The students have had the chance to learn and use skills in oil painting, sketching with chalk, sculpting, and weaving. Learning to typewrite is a skill that will help all of us in our work today. The development of the computer will open doors for people with the keyboarding skills and will make typing a necessity. Managers, as well as secretaries, will need skill at the keyboard to input data and process words. Therefore, good keyboarding skills may be important to you.`,
  `The cognitive characteristics of paragraph comprehension items were studied by comparing models that deal with two general processing stages: text representation and response decision. The models that were compared included the prepositional structure of the text (Kintsch & van Dijk, 1978), various counts of surface structure variables and word frequency (Drum et al., 1981), a taxonomy of levels of text questions (Anderson, 1972), and some new models that combine features of these models. Calibrations from the linear logistic latent trait model allowed evaluation of the impact of the cognitive variables on item responses. The results indicate that successful prediction of item difficulty is obtained from models with wide representation of both text and decision processing. This suggests that items can be screened for processing difficulty prior to being administered to examinees. However, the results also have important implications for test validity in that the two processing stages involve two different ability dimensions.`,
  `The word euthanasia is of Greek origin and literally means "a good death." The American Heritage Dictionary defines it as "the act of killing a person painlessly for reasons of mercy." Such killing can be done through active means, such as administering a lethal injection, or by passive means, such as withholding medical care or food and water. In recent years in the United States, there have been numerous cases of active euthanasia in the news. They usually involve the deliberate killing of ill or incapacitated persons by relatives or friends who plead that they can no longer bear to see their loved ones suffer. Although such killings are a crime, the perpetrators are often dealt with leniently by our legal system, and the media usually portrays them as compassionate heroes who take personal risks to save another from unbearable suffering.`,
  `Autism spectrum disorders (ASD) are a range of psychological conditions characterized by abnormalities in social interaction, behavior, interests, and communication. The five forms of ASD include classical autism, Asperger syndrome, Pervasive Developmental Disorder, Rett syndrome, and Childhood Disintegrative Disorder. Although the number of reported cases of ASD has experienced a dramatic increase in the past 25 years, the majority of doctors agree that this increase is due to changes in diagnostic practices and advances in the understanding of psychiatric health. While there is no general consensus among medical professionals about the underlying causes of ASD, theories range from genetic inheritance to environmental factors. One of the most controversial theories to have emerged in recent times is the hypothesis that ASD could be caused by the MMR vaccine, which is an immunization against measles, mumps, and rubella that was first developed in the 1960's.`,
  `Nature writing is nonfiction or fiction prose or poetry about the natural environment. Nature writing encompasses a wide variety of works, ranging from those that place primary emphasis on natural history facts (such as field guides) to those in which philosophical interpretation predominate. It includes natural history essays, poetry, essays of solitude or escape, as well as travel and adventure writing.`,
  `There is no universal agreement as to the exact definition and boundaries of logic, and this is why the issue still remains one of the main subjects of research and debates in the field of philosophy of logic (see § Rival conceptions, below). However, it has traditionally included the classification of arguments, the systematic exposition of the logical forms, the validity and soundness of deductive reasoning, the strength of inductive reasoning, the study of formal proofs and inference (including paradoxes and fallacies), and the study of syntax and semantics`,
  `While the predominant value of existentialist thought is commonly acknowledged to be freedom, its primary virtue is authenticity. In the view of the existentialist, the individual's starting point is characterized by what has been called "the existential angst" (or, variably, existential attitude, dread, etc.), or a sense of disorientation, confusion, or dread in the face of an apparently meaningless or absurd world. Many existentialists have also regarded traditional systematic or academic philosophies, in both style and content, as too abstract and remote from concrete human experience.`,
  `Canada is a country in the northern part of North America. Its ten provinces and three territories extend from the Atlantic to the Pacific and northward into the Arctic Ocean, covering 9.98 million square kilometres (3.85 million square miles), making it the world's second-largest country by total area. Its southern border with the United States, stretching 8,891 kilometres (5,525 mi), is the world's longest bi-national land border. Canada's capital is Ottawa, and its three largest metropolitan areas are Toronto, Montreal, and Vancouver.`,
  `Wembley Stadium (branded as Wembley Stadium connected by EE for sponsorship reasons) is a football stadium in Wembley, London, which opened in 2007, on the site of the original Wembley Stadium, which was demolished from 2002 to 2003. The stadium hosts major football matches including home matches of the England national football team, and the FA Cup Final. The stadium was also the temporary home of Premier League football club Tottenham Hotspur between August 2017 and March 2019, while White Hart Lane was being demolished and their new stadium was constructed.`,
  `War is a state of conflict between relatively large groups of people (such as nations, states, organizations, social groups) which is characterized by the use of armed lethal violence between combatants or upon civilians. Other terms for war, which often serve as euphemisms, include armed conflict, hostilities, and police action. A common look on war is a series of military campaigns between at least two or more opposing sides involving a dispute over sovereignty, territory, resources, ideology or a host of other issues. A war to liberate an occupied country is sometimes characterised as a "war of liberation", while a war between internal elements of the same state is called as civil war.`,
];

export const typerSettings = {
  alphabetTyper: {
    value: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    difficulty: { easy: 2, medium: 1, hard: 0 },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    returnParagraphArray(isHard = false) {
      jumbledLetters = this.shuffleArray(this.value.split(' '));
      return isHard ? jumbledLetters : this.value.split(' ');
    },
  },
  paraTyper: {
    value: LIST_OF_PARAGRAPHS,
    difficulty: { easy: 5, medium: 3, hard: 1 },
    returnParagraphArray(isHard = false) {
      return this.value[Math.floor(Math.random() * this.value.length)].split(
        ' '
      );
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
      const length = this.returnInfiniteModeWords().length;
      return this.returnInfiniteModeWords()[Math.floor(Math.random() * length)];
    },
  },
};
