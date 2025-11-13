export interface BlogPost {
  id?: string | number // For backend API integration
  image: string
  category: string
  title: string
  date: string
  excerpt: string[]
  author: {
    name: string
    avatar: string
  }
  content?: string[] // Full content for single post page
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: '/Gbur/DSC_9972.jpg',
    category: 'SHARING YOUR FAITH',
    title: "How to Invite Your Friends to Follow Jesus",
    date: 'October 31, 2025',
    excerpt: [
      `"I've described myself as an atheist for as long as I can remember," Brian said. "But now, I'd say I'm more agnostic." Brian and I have been talking about faith since we were roommates in college.`,
      `"So," he said, stirring his coffee thoughtfully, "I know you're deeply religious in ways I'm not, and I'm intrigued to know more about what that means to you."`,
    ],
    author: {
      name: 'Jason Gaboury',
      avatar: '/Gbur/DSC_9816.jpg',
    },
    content: [
      `"I've described myself as an atheist for as long as I can remember," Brian said. "But now, I'd say I'm more agnostic." Brian and I have been talking about faith since we were roommates in college.`,
      `"So," he said, stirring his coffee thoughtfully, "I know you're deeply religious in ways I'm not, and I'm intrigued to know more about what that means to you."`,
      `That conversation changed everything. It wasn't about converting him on the spot or winning an argument. It was about sharing my story, listening to his questions, and being present with him in his journey.`,
      `Inviting friends to follow Jesus isn't about having all the answers or being perfect. It's about being authentic, vulnerable, and available. It's about creating spaces where questions are welcome and doubt is not seen as a threat.`,
      `When we approach evangelism with humility and genuine care for the person in front of us, we create opportunities for God to work. Brian didn't become a Christian that day, but he did start asking more questions, and those questions opened doors for deeper conversations about faith, purpose, and meaning.`,
      `The key is to be intentional but not pushy. Share your story naturally. Ask questions about their journey. Listen more than you speak. And trust that God is at work in ways you may not see.`,
    ],
  },
  {
    id: 2,
    image: '/Gbur/DSC_9909.jpg',
    category: 'STORIES FROM CAMPUS',
    title: "Transformed by Scripture: Neil's Story",
    date: 'October 30, 2025',
    excerpt: [
      "Neil, now an alumnus of the University of Texas at Austin, encountered InterVarsity not through an invitation, a roommate, or a table, but from a humble flyer.",
    ],
    author: {
      name: 'Kaitlyn Doty',
      avatar: '/Gbur/DSC_9802.jpg',
    },
    content: [
      "Neil, now an alumnus of the University of Texas at Austin, encountered InterVarsity not through an invitation, a roommate, or a table, but from a humble flyer.",
      `It was a Tuesday afternoon when Neil was walking across campus, trying to navigate his first semester. The transition from high school to college was overwhelming, and he felt lost in the sea of students around him.`,
      `A simple piece of paper taped to a bulletin board caught his eye. "InterVarsity Bible Study - All Welcome." Those words stuck with him, and though he wasn't sure what to expect, he decided to show up the following week.`,
      `That first Bible study changed everything. For the first time, Neil felt like he belonged somewhere. The community welcomed him with open arms, and the Scripture came alive in ways he had never experienced before.`,
      `Through consistent attendance and genuine relationships, Neil's faith grew deeper. He went from being a curious observer to an active participant, and eventually, he became a leader in the community, helping other students discover the same transformation he had found.`,
      `Neil's story reminds us that God works in mysterious ways. Sometimes, it's not a grand invitation or a personal connection that draws someone in—it's a simple flyer, a moment of curiosity, and a willingness to take a step of faith.`,
    ],
  },
  {
    id: 3,
    image: '/Gbur/m-1.jpg',
    category: 'SPIRITUAL FORMATION',
    title: "From Isolated to Invitational: Avelino's Story",
    date: 'October 28, 2025',
    excerpt: [
      "The more time Avelino spent growing close to his InterVarsity community and reading the Bible, the more he wanted to share his faith with others and invite them into the community.",
      "Through consistent prayer and intentional relationships, Avelino discovered the joy of leading others to Christ.",
    ],
    author: {
      name: 'Sarah Johnson',
      avatar: '/Gbur/DSC_9804.jpg',
    },
    content: [
      "The more time Avelino spent growing close to his InterVarsity community and reading the Bible, the more he wanted to share his faith with others and invite them into the community.",
      "Through consistent prayer and intentional relationships, Avelino discovered the joy of leading others to Christ.",
      `Avelino came to college feeling isolated and uncertain. He had grown up in a faith-filled home, but in this new environment, he wasn't sure how to connect with others or how to live out his faith authentically.`,
      `When he joined InterVarsity, something shifted. The weekly Bible studies and community gatherings became a source of strength and encouragement. As he grew in his understanding of Scripture and his relationship with God, he began to see the world differently.`,
      `The transformation was gradual but profound. Avelino went from being someone who kept his faith private to someone who naturally invited others into conversations about Jesus. He started seeing opportunities to share his story and to listen to the stories of others.`,
      `What made the difference? Consistent time in prayer, intentional discipleship relationships, and a community that both challenged and supported him. Avelino learned that spiritual growth isn't just about personal development—it's about becoming more like Jesus, who was always inviting others into relationship with the Father.`,
      `Today, Avelino continues to impact lives on campus, not through pressure or manipulation, but through genuine love, authentic relationships, and a willingness to share the hope he has found in Christ.`,
    ],
  },
  {
    id: 4,
    image: '/Gbur/m-2.jpg',
    category: 'SCRIPTURE',
    title: "A Taste of an InterVarsity Bible Study",
    date: 'October 25, 2025',
    excerpt: [
      "We really think an InterVarsity Bible study is one of the best ways to learn more about Jesus and grow your faith. Try it out and experience the transformative power of Scripture.",
      "Join us as we explore God's Word together and discover how it applies to our daily lives as students and faculty.",
    ],
    author: {
      name: 'Michael Chen',
      avatar: '/Gbur/DSC_9781.jpg',
    },
    content: [
      "We really think an InterVarsity Bible study is one of the best ways to learn more about Jesus and grow your faith. Try it out and experience the transformative power of Scripture.",
      "Join us as we explore God's Word together and discover how it applies to our daily lives as students and faculty.",
      `Every Tuesday evening, students gather in a small room on campus. Laptops are closed, phones are put away, and Bibles are opened. The atmosphere is warm and welcoming, filled with anticipation for what God might reveal through His Word.`,
      `The study begins with prayer, asking the Holy Spirit to guide our understanding. We read a passage together, sometimes more than once, letting the words sink in. Then comes the discussion—not a lecture, but a genuine conversation where every voice is valued.`,
      `Questions are encouraged. Doubts are welcomed. Personal experiences are shared. We're not here to prove a point or defend a position, but to encounter God through Scripture and to see how His Word speaks to our lives today.`,
      `This is what makes an InterVarsity Bible study special. It's not about checking a box or fulfilling a requirement. It's about transformation—allowing God's Word to shape our thoughts, our actions, and our relationships.`,
      `Whether you're new to the Bible or have been reading it for years, there's a place for you here. Come as you are, bring your questions, and discover the life-changing power of studying Scripture in community.`,
    ],
  },
  {
    id: 5,
    image: '/Gbur/m-3.jpg',
    category: 'STORIES FROM CAMPUS',
    title: "From the Barbershop to Bible Study—Diana's Story",
    date: 'October 22, 2025',
    excerpt: [
      "Of all the organizations and clubs vying for Diana's attention, one poster advertising a Bible study caught her eye and changed her life forever.",
      "What started as curiosity led to a deep relationship with Jesus and a calling to serve others on campus.",
    ],
    author: {
      name: 'Emily Rodriguez',
      avatar: '/Gbur/DSC_9929.jpg',
    },
    content: [
      "Of all the organizations and clubs vying for Diana's attention, one poster advertising a Bible study caught her eye and changed her life forever.",
      "What started as curiosity led to a deep relationship with Jesus and a calling to serve others on campus.",
      `Diana was working at a barbershop near campus when she first saw the poster. It was a simple design, but something about it resonated with her. She had been searching for meaning and purpose, though she wasn't sure what that looked like.`,
      `That first Bible study meeting was unlike anything she had experienced. The genuine care she felt from the group, the honest discussions about faith and life, and the way Scripture spoke directly to her situation—it all felt like coming home.`,
      `As Diana continued to attend, she began to understand who Jesus was in a deeper way. The stories of His love, His sacrifice, and His invitation to follow Him transformed her perspective on life. She realized that faith wasn't about rules or rituals, but about relationship.`,
      `Today, Diana is a leader in the InterVarsity community, sharing her story with others and helping create the same welcoming space that she first experienced. Her journey from curiosity to commitment is a reminder that God meets us exactly where we are.`,
      `Whether you're working a job, studying full-time, or just trying to figure out life, there's a place for you in this community. Diana's story proves that sometimes the most significant transformations begin with a simple step of curiosity.`,
    ],
  },
  {
    id: 6,
    image: '/Gbur/m-5.jpg',
    category: 'COMMUNITY AND RELATIONSHIPS',
    title: "Building Community Through Faith",
    date: 'October 20, 2025',
    excerpt: [
      "Discover how students across campus are coming together to build meaningful relationships centered on Christ and His teachings.",
      "In a world of surface-level connections, we're creating deep, authentic community that lasts beyond graduation.",
    ],
    author: {
      name: 'David Thompson',
      avatar: '/Gbur/DSC_0044.jpg',
    },
    content: [
      "Discover how students across campus are coming together to build meaningful relationships centered on Christ and His teachings.",
      "In a world of surface-level connections, we're creating deep, authentic community that lasts beyond graduation.",
      `In an age of social media and digital connections, genuine community can feel hard to find. But on campuses across the country, students are discovering something different—a community that goes beyond surface-level interactions.`,
      `InterVarsity communities are built on the foundation of authentic relationships. We gather not just to study together, but to share life together. We celebrate each other's victories, walk through each other's struggles, and point each other toward Christ.`,
      `This kind of community doesn't happen by accident. It requires intentionality, vulnerability, and a commitment to showing up for one another. It means being willing to share your story, to listen to others' stories, and to create space for God to work in the midst of our relationships.`,
      `The friendships formed in these communities often last far beyond graduation. Alumni consistently report that the relationships they built in InterVarsity are among the most meaningful of their lives. These are the people who pray for you, encourage you, and challenge you to grow in your faith.`,
      `If you're looking for more than just another club or organization, if you're seeking genuine connection and authentic community, we invite you to join us. Come as you are, and discover what it means to be part of a community that is centered on Christ and committed to one another.`,
    ],
  },
  {
    id: 7,
    image: '/Gbur/m-6.jpg',
    category: 'ALUMNI AND STAFF PROFILES',
    title: "Campus Ministry Impact Stories",
    date: 'October 18, 2025',
    excerpt: [
      "Read inspiring stories of how campus ministry is transforming lives and creating lasting impact in student communities nationwide.",
      "Our alumni continue to make a difference in their workplaces, churches, and neighborhoods, living out the values they learned in InterVarsity.",
    ],
    author: {
      name: 'Jennifer Martinez',
      avatar: '/Gbur/DSC_9816.jpg',
    },
    content: [
      "Read inspiring stories of how campus ministry is transforming lives and creating lasting impact in student communities nationwide.",
      "Our alumni continue to make a difference in their workplaces, churches, and neighborhoods, living out the values they learned in InterVarsity.",
      `The impact of campus ministry extends far beyond the college years. Students who are transformed by their time in InterVarsity go on to become leaders in their churches, workplaces, and communities, carrying the values and faith they developed on campus into every area of their lives.`,
      `Take Maria, for example. As a student, she was challenged to think about justice and reconciliation in new ways. Today, she's a social worker, using her faith to advocate for marginalized communities. Or James, who learned to lead Bible studies on campus and now serves as a small group leader in his local church.`,
      `These stories are not unique. Across the country, InterVarsity alumni are making a difference. They're starting businesses with ethical practices, serving in their communities, raising families with faith-centered values, and continuing to grow in their relationship with God.`,
      `The foundation laid during college years—through Bible study, community, worship, and service—becomes the bedrock for a lifetime of faith and impact. Campus ministry isn't just about the four years you spend in college; it's about equipping you for a lifetime of following Jesus and serving others.`,
      `If you're a current student, know that your time in InterVarsity is preparing you for something greater. If you're an alum, we'd love to hear your story of how campus ministry has continued to impact your life.`,
    ],
  },
  {
    id: 8,
    image: '/Gbur/m-8.jpg',
    category: 'SPIRITUAL FORMATION',
    title: "Growing in Faith Together",
    date: 'October 15, 2025',
    excerpt: [
      "Explore resources and testimonies about spiritual growth, discipleship, and the journey of following Jesus in college.",
      "We believe that spiritual formation happens best in community, where we can encourage one another and learn from each other's experiences.",
    ],
    author: {
      name: 'Robert Kim',
      avatar: '/Gbur/DSC_9909.jpg',
    },
    content: [
      "Explore resources and testimonies about spiritual growth, discipleship, and the journey of following Jesus in college.",
      "We believe that spiritual formation happens best in community, where we can encourage one another and learn from each other's experiences.",
      `Spiritual growth is not a solo journey. While personal time with God is essential, we believe that the deepest transformation happens when we're walking alongside others who are committed to following Jesus.`,
      `In InterVarsity, spiritual formation happens through multiple avenues: weekly Bible studies that challenge us to engage with Scripture, discipleship relationships that provide accountability and encouragement, and community gatherings where we worship and learn together.`,
      `This holistic approach to spiritual growth recognizes that we're not just trying to accumulate knowledge or check religious boxes. We're seeking to become more like Jesus—in our thoughts, our actions, our relationships, and our character.`,
      `The journey is different for everyone. Some students come in with a strong foundation of faith, while others are exploring Christianity for the first time. Some are dealing with doubt, while others are wrestling with how to live out their faith in practical ways.`,
      `No matter where you are in your spiritual journey, there's a place for you here. We're all growing together, learning from each other, and being transformed by God's grace. Join us as we discover what it means to follow Jesus in college and beyond.`,
    ],
  },
]

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to find post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => generateSlug(post.title) === slug)
}

// Helper function to find post by ID (for backend API integration)
export function getPostById(id: string | number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

