pragma solidity ^0.4.24;


contract Lottery {
    
    mapping (uint256 => address[]) playersByNumber ;
    mapping (address => uint256) numbersByPlayer ;
    mapping (address => uint256) betsByPlayer ;
    mapping (address => uint256) fundsByPlayer ;
    mapping (address => bytes32) playersHash;

    address[] playerList;
    
    address owner;
    enum LotteryState { FirstRound, SecondRound, Finished }
    enum LotteryStage { AVG, MAX, XOR }
    
    LotteryState state; 
    LotteryStage stage;
    
    uint256 public minBetAmount;
    uint256 public donateLevel;
    
    constructor(uint256 _minBetAmount, uint256 _donateLevel) public{
        owner = msg.sender;
        state = LotteryState.FirstRound;
        stage = LotteryStage.AVG;
        minBetAmount = _minBetAmount;
        donateLevel = _donateLevel;
    }
    
    function enterHash(bytes32 x) public payable {
        require(state == LotteryState.FirstRound);
        require(msg.value > minBetAmount);
        betsByPlayer[msg.sender] = msg.value;
        playersHash[msg.sender] = x;
    }

    function runSecondRound() public {
        require(msg.sender == owner);
        require(state == LotteryState.FirstRound);
        state = LotteryState.SecondRound;
        playerList = new address[](0);
    }
    
    function runNextStage() public {
        require(msg.sender == owner);
        require(stage == LotteryStage.AVG || stage == LotteryStage.MAX);
        if (stage == LotteryStage.AVG) {
            stage = LotteryStage.MAX;
        }
        else {
            stage = LotteryStage.XOR;
        }
        state=LotteryState.FirstRound;
    }
    
    function enterNumber(uint256 number) public {
        require(number<=250);
        require(number>0);
        require(state == LotteryState.SecondRound);
        //bytes32 a = keccak256(number);
        require(keccak256(number) == playersHash[msg.sender]);
        numbersByPlayer[msg.sender] = number;
        playerList.push(msg.sender);
        // !!!!may be duplicate here
    }
    
    function determineWinner() public {
        require(msg.sender == owner);
        
        state = LotteryState.Finished;
        
        getFundsList();
        
        distributeFunds();

    }
    
    function distributeFunds() private returns(uint256) {
        uint256 playerCount = playerList.length;
        for (uint i = 0; i<playerCount; i++) {
            playerList[i].transfer(fundsByPlayer[playerList[i]]);
        }
        return this.balance;
    }
    
    function getFundsList() private{
        
        uint256 number_sum=0;
        uint256 bet_sum=0;
        uint256 bet_div_dis_sum=0;
        uint i=0;
        uint256 m=0;

        // average times 2/3
        if(stage==LotteryStage.AVG) 
        {
            for(i=0;i<playerList.length;i++)
            {
                number_sum+=numbersByPlayer[playerList[i]];
                bet_sum+=betsByPlayer[playerList[i]];
            }
            m=number_sum/playerList.length*2/3;
            for(i=0;i<playerList.length;i++)
            {
                if(numbersByPlayer[playerList[i]]>=m)
                {
                    bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(numbersByPlayer[playerList[i]]-m+1);
                }
                else
                {
                    bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(m-numbersByPlayer[playerList[i]]+1);
                }
            }           
            
            for(i=0;i<playerList.length;i++)
            {
                if(numbersByPlayer[playerList[i]]>=m)
                {
                    fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(numbersByPlayer[playerList[i]]-m+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                }
                else
                {
                    fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(m-numbersByPlayer[playerList[i]]+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                }    
            }
        }

        // the largest unique value
        else if(stage==LotteryStage.MAX)
        {
            number_sum=0;
            bet_sum=0;
            bet_div_dis_sum=0;
            for(i=0;i<playerList.length;i++)
            {
                number_sum+=numbersByPlayer[playerList[i]];
                bet_sum+=betsByPlayer[playerList[i]];
            }

            // bubble sort
            address temp;
            for(i=0;i<playerList.length-1;i++)
            {
                for(uint j=0;j<playerList.length-1-i;j++)
                {
                    if(numbersByPlayer[playerList[j]]>numbersByPlayer[playerList[j+1]])
                    {
                        temp=playerList[j];
                        playerList[j]=playerList[j+1];
                        playerList[j+1]=temp;
                    }
                }
            }

            uint k;
            bool flag=false;
            if(numbersByPlayer[playerList[playerList.length-1]]!=numbersByPlayer[playerList[playerList.length-2]])
            {
                m=numbersByPlayer[playerList[playerList.length-1]];
                k=playerList.length-1;
                flag=true;
            }
            else 
            {
                for(i=playerList.length-2;i>0;i--)
                {
                    if(numbersByPlayer[playerList[i]]!=numbersByPlayer[playerList[i-1]]&&numbersByPlayer[playerList[i]]!=numbersByPlayer[playerList[i+1]])
                    {
                        m=numbersByPlayer[playerList[i]];
                        k=i;
                        flag=true;
                        break;
                    }
                }
            }
            if(!flag)
            {
                if(numbersByPlayer[playerList[0]]!=numbersByPlayer[playerList[1]])
                {
                    m=numbersByPlayer[playerList[0]];
                    k=0;
                    flag=true;
                }
            }

            if(!flag)
            {
                for(i=0;i<playerList.length;i++)
                {
                    fundsByPlayer[playerList[i]]=betsByPlayer[playerList[i]]*(100-donateLevel)/100;
                }
                return;
            }
            else
            {
                for(i=0;i<=k;i++)
                {
                    if(numbersByPlayer[playerList[i]]>=m)
                    {
                        bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(numbersByPlayer[playerList[i]]-m+1);
                    }
                    else
                    {
                        bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(m-numbersByPlayer[playerList[i]]+1);
                    }
                } 
                for(i=0;i<playerList.length;i++)
                {
                    if(numbersByPlayer[playerList[i]]>=m)
                    {
                        fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(numbersByPlayer[playerList[i]]-m+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                    }
                    else
                    {
                        fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(m-numbersByPlayer[playerList[i]]+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                    }  
                }  
            }
        }

        // XOR
        else if(stage==LotteryStage.XOR)
        {
            number_sum=0;
            bet_sum=0;
            bet_div_dis_sum=0;
            for(i=0;i<playerList.length;i++)
            {
                number_sum+=numbersByPlayer[playerList[i]];
                bet_sum+=betsByPlayer[playerList[i]];
            }
            m=numbersByPlayer[playerList[0]];
            for(i=0;i<playerList.length;i++)
            {
                m^=numbersByPlayer[playerList[i]];
            }           
            for(i=0;i<playerList.length;i++)
            {
                if(numbersByPlayer[playerList[i]]>=m)
                {
                    bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(numbersByPlayer[playerList[i]]-m+1);
                    }
                else
                {
                    bet_div_dis_sum+=(betsByPlayer[playerList[i]]*100)/(m-numbersByPlayer[playerList[i]]+1);
                }
            }           
            
            for(i=0;i<playerList.length;i++)
            {
                if(numbersByPlayer[playerList[i]]>=m)
                {
                    fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(numbersByPlayer[playerList[i]]-m+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                }
                else
                {
                    fundsByPlayer[playerList[i]]=(betsByPlayer[playerList[i]]*10000)/(m-numbersByPlayer[playerList[i]]+1)/bet_div_dis_sum*bet_sum*(100-donateLevel)/100/100;
                }  
            }           
        
        }
    }
    
}