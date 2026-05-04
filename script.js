

document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger)

	const animeTextParagraphs = document.querySelectorAll('.anime-text p')

	const wordHighlightBgColor = '60, 60, 60'

	const keywords = [
		'vibrant',
		'living',
		'clarity',
		'expression',
		'shape',
		'intuitive',
		'storytelling',
		'interactive',
		'vision',
	]

	// 🔥 розбивка на слова
	animeTextParagraphs.forEach(paragraph => {
		const text = paragraph.textContent
		const words = text.split(/\s+/)
		paragraph.innerHTML = ''

		words.forEach(word => {
			if (word.trim()) {
				const wordContainer = document.createElement('div')
				wordContainer.className = 'word'

				const wordText = document.createElement('span')
				wordText.textContent = word

				const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, '')
				if (keywords.includes(normalizedWord)) {
					wordContainer.classList.add('keyword-wrapper')
					wordText.classList.add('keyword', normalizedWord)
				}

				wordContainer.appendChild(wordText)
				paragraph.appendChild(wordContainer)
			}
		})
	})

	const animeTextContainers = document.querySelectorAll('.anime-text-container')

	animeTextContainers.forEach(container => {
		ScrollTrigger.create({
			trigger: container,
			pin: container,
			start: 'top top',
			end: `+=${window.innerHeight * 4}`,
			pinSpacing: true,

			onUpdate: self => {
				const progress = self.progress
				const words = Array.from(
					container.querySelectorAll('.anime-text .word'),
				)
				const totalWords = words.length

				words.forEach((word, index) => {
					const wordText = word.querySelector('span')

					if (progress <= 0.7) {
						const revealProgress = progress / 0.7

						const overlapWords = 15
						const wordStart = index / totalWords
						const wordEnd = wordStart + overlapWords / totalWords

						const wordProgress =
							revealProgress <= wordStart
								? 0
								: revealProgress >= wordEnd
									? 1
									: (revealProgress - wordStart) / (wordEnd - wordStart)

						word.style.opacity = wordProgress

						const bgOpacity =
							wordProgress >= 0.9 ? 1 - (wordProgress - 0.9) / 0.1 : 1
						word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${bgOpacity})`

						const textProgress =
							wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0

						wordText.style.opacity = textProgress
					} else {
						const reverseProgress = (progress - 0.7) / 0.3

						const reverseOverlap = 5
						const wordStart = index / totalWords
						const wordEnd = wordStart + reverseOverlap / totalWords

						const wordProgress =
							reverseProgress <= wordStart
								? 0
								: reverseProgress >= wordEnd
									? 1
									: (reverseProgress - wordStart) / (wordEnd - wordStart)

						wordText.style.opacity = 1 - wordProgress
						word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${wordProgress})`
					}
				})
			},
		})
	})

	// ✅ важливо без lenis
	ScrollTrigger.refresh()
})
