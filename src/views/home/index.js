import React from 'react';
import { Container, Card } from 'reactstrap';

function Index() {
	return (
		<Container>
			<Card className='mt-5 p-5'>
				<h1 className='display-4'>&#123;Nelson Nolia&#125;</h1>
				<p>
					Hi, I'm Nelson, an aspiring front-end developer passionate about crafting intuitive user interfaces and building responsive web applications.
					Currently, I'm focused on honing my skills to create modern, interactive, and efficient digital experiences.
					Beyond coding, I enjoy exploring new tools and technologies that push the my boundaries of creativity in web development.
				</p>
				<address>
					<a href='mailto:email@address.com'>real.nelson92@gmail.com</a>
					<br />
				</address>
			</Card>
		</Container>
	);
}

export default Index;
