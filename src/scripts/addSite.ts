import DBManager from '../lib/utils/DBManager';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

async function main() {
  try {
    const dbManager = new DBManager();

    // console.log('새로운 사이트 추가하기\n');

    // const name = await question('사이트 이름: ');
    // const description = await question('사이트 설명: ');
    // const icon = await question('아이콘 경로 (/images/sites/...): ');
    // const url = await question('사이트 URL: ');
    
    // console.log('\n카테고리 선택:');
    // console.log('1. guide');
    // console.log('2. tool');
    // console.log('3. addon');
    // console.log('4. community');
    
    // const categoryNum = await question('카테고리 번호 선택 (1-4): ');
    
    const categories = ['guide', 'tool', 'addon', 'community'];
    const category = categories[0];

    if (!category) {
      throw new Error('잘못된 카테고리 선택');
    }

    const newSite = await dbManager.addSite({
      name: "WowMeta",
      description: "로그와 순위표의 통계 모니터링",
      icon: "/images/sites/wowmeta.png",
      url: "https://wowmeta.com/",
      category
    });

    console.log('\n성공적으로 추가되었습니다!');
    console.log('추가된 사이트 정보:', newSite);

  } catch (error) {
    console.error('에러 발생:', error);
  } finally {
    rl.close();
  }
}

main();