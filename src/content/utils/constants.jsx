export const API = process.env.NODE_ENV === "production" ? "https://64.225.56.158:6390/"
	: "http://64.225.56.158:6390/";

export const likertVals = ['Strongly<br>Disagree', 'Disagree', 'No<br>Opinion', 'Agree', 'Strongly<br>Agree'];

// FIXME this should go to the server with an edit API
export const qBank = {
	1: {
		instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
		qType: 'Diversity',
		qData: [
			{ 'qId': 'q1', 'text': 'All the recommended movies in the final list were similar to each other.', 'flag': false },
			{ 'qId': 'q2', 'text': 'None of the movies in the recommended list were alike', 'flag': false },
			{ 'qId': 'q3', 'text': 'Most movies were from the same genre', 'flag': false },
			{ 'qId': 'q4', 'text': 'The recommended list of movies suits a broad set of tastes', 'flag': false },
			{ 'qId': 'q5', 'text': 'The recommended movies were from many different genres', 'flag': false },
			{ 'qId': 'q6', 'text': 'The recommendations contained a lot of variety', 'flag': false }
		]
	},
	2: {
		instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
		qType: 'RecQual',
		qData: [
			{ 'qId': 'q1', 'text': 'I liked the movies recommended by the movie recommender', 'flag': false },
			{ 'qId': 'q2', 'text': 'I found the recommended movies appealing', 'flag': false },
			{ 'qId': 'q3', 'text': 'The recommended movies fit my preference', 'flag': false },
			{ 'qId': 'q4', 'text': 'The recommended movies were relevant', 'flag': false },
			{ 'qId': 'q5', 'text': 'The system recommended too many bad movies.', 'flag': false },
			{ 'qId': 'q6', 'text': 'I did not like any of the recommended movies.', 'flag': false }
		]
	},
	3: {
		instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
		qType: 'choiceSat',
		qData: [
			{ 'qId': 'q1', 'text': 'I like the movie I’ve chosen from the final recommendation list.', 'flag': false },
			{ 'qId': 'q2', 'text': 'The chosen movie fits my preference.', 'flag': false },
			{ 'qId': 'q3', 'text': 'I would recommend my chosen movie to others/friends.', 'flag': false },
			{ 'qId': 'q4', 'text': 'I was excited about my chosen movie', 'flag': false },
			{ 'qId': 'q5', 'text': 'I think I chose the best movie from the options', 'flag': false },
			{ 'qId': 'q6', 'text': 'I know several items that are better than the one I selected', 'flag': false },
			{ 'qId': 'q7', 'text': 'I would rather watch a different movie from the one I selected', 'flag': false }
		]
	},
	4: {
		instruction: 'Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:',
		qType: 'recConformity',
		qData: [
			{ 'qId': 'q1', 'text': 'I feel like I was recommended the same movies as everyone else.', 'flag': false },
			{ 'qId': 'q2', 'text': 'I think the recommendations are unique to me.', 'flag': false },
			{ 'qId': 'q3', 'text': 'I believe that the system is giving me a one of a kind experience.', 'flag': false },
			{ 'qId': 'q4', 'text': 'I believe that the movies recommended to me are rather different from the movies recommended to others.', 'flag': false },
			{ 'qId': 'q5', 'text': 'I would not be surprised if the system recommended the same movies to many other users', 'flag': false }
		]
	},
	5: {
		instruction: 'Please rate your agreement with the statements about your <strong> OVERALL </strong> experience with the movie recommender:',
		qType: 'tasteCov',
		qData: [
			{ 'qId': 'q1', 'text': 'The movie recommender catered to all of my potential interests', 'flag': false },
			{ 'qId': 'q2', 'text': 'The movies that were recommended did not reflect my diverse taste in movies.', 'flag': false },
			{ 'qId': 'q3', 'text': 'The movie recommender seemed to target only a small subset of my interests.', 'flag': false },
			{ 'qId': 'q4', 'text': 'The movie recommender treated me as a one-dimensional person.', 'flag': false },
			{ 'qId': 'q5', 'text': 'The lists of recommendations matched a diversity of my preferences.', 'flag': false },
			{ 'qId': 'q6', 'text': 'The recommended movies were a perfect fit for me on many different levels.', 'flag': false },
			{ 'qId': 'q7', 'text': 'The movie recommender seemed to stereotype me in a particular category of viewers.', 'flag': false }
		]
	},
	6: {
		instruction: 'Please rate your agreement with the statements about your <strong> OVERALL </strong> experience with the movie recommender:',
		qType: 'sysSat',
		qData: [
			{ 'qId': 'q1', 'text': 'I like using the system.', 'flag': false },
			{ 'qId': 'q2', 'text': 'Using the system is a pleasant experience.', 'flag': false },
			{ 'qId': 'q3', 'text': 'I would recommend the system to others.', 'flag': false },
			{ 'qId': 'q4', 'text': 'I can find better movies using the system.', 'flag': false },
			{ 'qId': 'q5', 'text': 'I would quickly abandon using the system.', 'flag': false },
			{ 'qId': 'q6', 'text': 'I would use the system more often if possible.', 'flag': false }
		]
	}
};