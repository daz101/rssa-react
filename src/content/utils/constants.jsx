export const API = process.env.NODE_ENV === "production" ? "https://rssa.recsys.dev/rssa/api/v1/"
	: "http://127.0.0.1:5001/";

export const likertVals = ['Strongly<br>Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly<br>Agree'];

// FIXME this should go to the server with an edit API
export const qBank = {
	1: {
		title: 'Questions about the final list of “movies you may like”',
		instruction: 'Please rate your agreement with the following' +
			' statements about your final recommendations <u><strong>the leftmost' +
			' list of 7 “movies you may like” on the last page of the' +
			' system.</strong></u><br>As a reminder, this list contained the' +
			' following movies:',
		qType: 'Diversity',
		displayRecs: true,
		showSelected: false,
		qData: [
			{ qId: 'q1', text: 'All the recommended movies in the final list were similar to each other.', flag: false },
			{ qId: 'q2', text: 'None of the movies in the final list of recommendations were alike.', flag: false },
			{ qId: 'q3', text: 'Most movies in the final list of recommendations were from the same genre.', flag: false },
			{ qId: 'q4', text: 'The final list of recommended movies suits a broad set of tastes.', flag: false },
			{ qId: 'q5', text: 'The recommended movies were from many different genres.', flag: false },
			{ qId: 'q6', text: 'The recommendations contained a lot of variety.', flag: false }
		]
	},
	2: {
		title: 'Questions about the final list of “movies you may like”',
		instruction: 'Please rate your agreement with the following' +
			' statements about your final recommendations <u><strong>the leftmost' +
			' list of 7 “movies you may like” on the last page of the' +
			' system.</strong></u><br>As a reminder, this list contained the' +
			' following movies:',
		qType: 'RecQual',
		displayRecs: true,
		showSelected: false,
		qData: [
			{ qId: 'q1', text: 'I liked the movies in the final list of recommendations.', flag: false },
			{ qId: 'q2', text: 'I found the movies in the final list of recommendations appealing.', flag: false },
			{ qId: 'q3', text: 'The recommended movies fit my preference.', flag: false },
			{ qId: 'q4', text: 'The recommended movies were relevant.', flag: false },
			{ qId: 'q5', text: 'The system recommended too many bad movies.', flag: false },
			{ qId: 'q6', text: 'I did <u><strong>not</strong></u> like any of the recommended movies.', flag: false }
		]
	},
	3: {
		title: 'Questions about the final list of “movies you may like”',
		instruction: 'Please rate your agreement with the following' +
			' statements about your final recommendations <u><strong>the leftmost' +
			' list of 7 “movies you may like” on the last page of the' +
			' system.</strong></u><br>As a reminder, this list contained the' +
			' following movies:',
		qType: 'recConformity',
		displayRecs: true,
		showSelected: false,
		qData: [
			{ qId: 'q1', text: 'I feel like I was recommended the same movies as everyone else.', flag: false },
			{ qId: 'q2', text: 'I think the recommendations are unique to me.', flag: false },
			{ qId: 'q3', text: 'I believe that the system is giving me a one of a kind experience.', flag: false },
			{ qId: 'q4', text: 'I believe that the movies recommended to me are rather different from the movies recommended to others.', flag: false },
			{ qId: 'q5', text: 'I would <u><strong>not</strong></u> be surprised if the system recommended the same movies to many other users.', flag: false }
		]
	}, 4: {
		title: 'Questions about the final list of "movies you may like"',
		instruction: 'Please indicate if you watched any of the movies from' +
			' the final recommendations <u><strong>the leftmost list of 7' +
			' "movies you may like" on the last page of the system.</strong></u>',
		qType: 'recFamiliarity',
		displayRecs: false,
		showSlected: false,
		qData: [
			{ qId: 'q1', text: 'Did you watch this movie before?', flag: false },
			{ qId: 'q2', text: 'How would you rate this movie?', flag: false }
		]

	},
	5: {
		title: 'Questions about the movie you selected',
		instruction: 'Please rate your agreement with the following statements' +
			' about the movie you selected on the final page of the system.' +
			'<br>As a reminder, you selected the following movie:',
		qType: 'choiceSat',
		displayRecs: false,
		showSelected: true,
		qData: [
			{ qId: 'q1', text: 'I like the movie I’ve chosen from the final recommendation list.', flag: false },
			{ qId: 'q2', text: 'The chosen movie fits my preference.', flag: false },
			{ qId: 'q3', text: 'I would recommend my chosen movie to others/friends.', flag: false },
			{ qId: 'q4', text: 'I was excited about my chosen movie.', flag: false },
			{ qId: 'a1', text: 'Regardless of your answer, choose "disagree" to the following.', flag: false},
			{ qId: 'q5', text: 'I think I chose the best movie from the options.', flag: false },
			{ qId: 'q6', text: 'I know several items that are better than the one I selected.', flag: false },
			{ qId: 'q7', text: 'I would rather watch a different movie from the one I selected.', flag: false }
		]
	},
	6: {
		title: 'Questions about the movie recommender system as a whole',
		instruction: 'Please rate your agreement with the statements about your' +
			' <u><strong>overall</strong></u> experience with the movie recommender:',
		qType: 'tasteCov',
		displayRecs: false,
		showSelected: false,
		qData: [
			{ qId: 'q1', text: 'The movie recommender catered to all of my potential interests.', flag: false },
			{
				qId: 'q2', text: 'The movies that were recommended did' +
					' <u><strong>not</strong></u> reflect my diverse taste in movies.', flag: false
			},
			{ qId: 'q3', text: 'The movie recommender seemed to target only a small subset of my interests.', flag: false },
			{ qId: 'q4', text: 'The movie recommender treated me as a one-dimensional person.', flag: false },
			{ qId: 'q5', text: 'The lists of recommendations matched a diversity of my preferences.', flag: false },
			{ qId: 'q6', text: 'The recommended movies were a perfect fit for me on many different levels.', flag: false },
			{ qId: 'q7', text: 'The movie recommender seemed to stereotype me in a particular category of viewers.', flag: false }
		]
	},
	7: {
		title: 'Questions about the movie recommender system as a whole',
		instruction: 'Please rate your agreement with the statements about your' +
			' <strong>overall</strong> experience with the movie recommender:',
		qType: 'sysSat',
		displayRecs: false,
		showSelected: false,
		qData: [
			{ qId: 'q1', text: 'I like using the system.', flag: false },
			{ qId: 'q2', text: 'Using the system is a pleasant experience.', flag: false },
			{ qId: 'q3', text: 'I would recommend the system to others.', flag: false },
			{ qId: 'q4', text: 'I can find better movies using the system.', flag: false },
			{ qId: 'q5', text: 'I would quickly abandon using the system.', flag: false },
			{ qId: 'q6', text: 'I would use the system more often if possible.', flag: false }
		]
	}
};

export const preSurveyBank = {
	1: {
		title: 'The following relate to how you find movies online.',
		instruction: 'Please rate your level of agreement with the statements.',
		qType: 'fomo',
		displayRecs: false,
		showSlected: false,
		qData: [
			{ qId: 'q1', text: 'I fear others may find more entertaining movies than me.', flag: false },
			{ qId: 'q2', text: 'I get worried when I find out others are finding better movies than me.', flag: false },
			{ qId: 'q3', text: 'I get anxious when I think about all the possible movies that are out there.', flag: false },
			{ qId: 'q4', text: 'Sometimes, I wonder if I spend too much time trying to make sure I have checked out every interesting movie.', flag: false },
			{ qId: 'q5', text: 'It bothers me when I miss an opportunity to learn about new available movies.', flag: false },
			{ qId: 'q6', text: 'When I miss out on an opportunity to watch a good movie, it bothers me.', flag: false },
			{ qId: 'q7', text: 'Once I decide to go watch a certain movie, I still check on other movies that are playing to see if there is anything better available.', flag: false }
		]
	},
	2: {
		title: 'The following relate to how you discover new things.',
		instruction: 'Please rate your agreement with the following statements.',
		qType: 'needNov',
		displayRecs: false,
		showSlected: false,
		qData: [
			{ qId: 'q1', text: 'When I see a new or different brand on the shelf, I often pick it up just to see what it is like.', flag: false },
			{ qId: 'q2', text: 'I like introducing new brands and products to my friends.', flag: false },
			{ qId: 'q3', text: 'I enjoy taking chances in buying unfamiliar brands just to get some variety in my purchase.', flag: false },
			{ qId: 'q4', text: 'I often read the information on the packages of products just out of curiosity.', flag: false },
			{ qId: 'q5', text: 'I get bored with buying the same brands even if they are good.', flag: false },
			{ qId: 'q6', text: 'I shop around a lot for my clothes just to find out more about the latest styles.', flag: false }
		]
	},
	3: {
		title: 'The following relate to your movie watching behavior.',
		instruction: 'Please rate your agreement with the following statements.',
		qType: 'movieEx',
		displayRecs: false,
		showSlected: false,
		qData: [
			{ qId: 'q1', text: 'I am a movie lover.', flag: false },
			{ qId: 'q2', text: 'Compared to my peers I watch a lot of movies.', flag: false },
			{ qId: 'q3', text: 'Compared to my peers I am an expert on movie.', flag: false },
			{ qId: 'q4', text: 'I only know a few movies.', flag: false }
		]
	},
	4: {
		title: 'The following relate to your goals and aspirations.',
		instruction: 'Please rate your agreement with the following statements.',
		qType: 'maxTen',
		displayRecs: false,
		showSlected: false,
		qData: [
			{ qId: 'q1', text: 'No matter what I do, I have the highest standards for myself.', flag: false },
			{ qId: 'q2', text: 'I never settle for second best.', flag: false },
			{ qId: 'q3', text: 'No matter what it takes, I always try to choose the best thing.', flag: false },
			{ qId: 'q4', text: 'I dont like having to settle for “good enough.”', flag: false },
			{ qId: 'q5', text: 'I am a maximizer.', flag: false },
			{ qId: 'q6', text: 'I will wait for the best option, no matter how long it takes.', flag: false },
			{ qId: 'q7', text: 'I never settle.', flag: false }
		]
	}
};
