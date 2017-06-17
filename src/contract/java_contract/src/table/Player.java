
        package table;
        import java.sql.ResultSet;
        import toolkit.database.expr.EQ;
        import toolkit.database.fields.*;
        import toolkit.database.TableName;
        import toolkit.database.TableDefined;
        import java.util.Date;
        public class Player {
            public static final STRING FD_PLAYERID=new STRING("playerid",50);
public static final STRING FD_USERID=new STRING("userid",50);
public static final BOOL FD_ONLINE=new BOOL("online");
public static final TIME FD_CREATETIME=new TIME("createtime");
            
            private String playerId;
            public void setPlayerId(String value){
                playerId=value;
            }
            public String getPlayerId(){
                return playerId;
            }
private String userId;
            public void setUserId(String value){
                userId=value;
            }
            public String getUserId(){
                return userId;
            }
private boolean online;
            public void setOnline(boolean value){
                online=value;
            }
            public boolean getOnline(){
                return online;
            }
private Date createTime;
            public void setCreateTime(Date value){
                createTime=value;
            }
            public Date getCreateTime(){
                return createTime;
            }
            
            public Player(String playerId, String userId, boolean online, Date createTime){
                this.playerId=playerId;
this.userId=userId;
this.online=online;
this.createTime=createTime;
            }
            
            public static Player newFromRS(ResultSet rs){
                return new Player(
                    FD_PLAYERID.getValue(rs),
FD_USERID.getValue(rs),
FD_ONLINE.getValue(rs),
FD_CREATETIME.getValue(rs)
                );
            }
            
            public static TableDefined newTableDefined(){
                return new TableDefined(
                    new TableName("Player"),
                    FD_PLAYERID,
FD_USERID,
FD_ONLINE,
FD_CREATETIME
                );
            }
            
            public static EQ[] toEQS(Player table){
                int len=4;
                EQ[] eqs=new EQ[len];
                eqs[0]=new EQ(FD_PLAYERID, table.playerId),
eqs[1]=new EQ(FD_USERID, table.userId),
eqs[2]=new EQ(FD_ONLINE, table.online),
eqs[3]=new EQ(FD_CREATETIME, table.createTime)
                return eqs;
            }
        }