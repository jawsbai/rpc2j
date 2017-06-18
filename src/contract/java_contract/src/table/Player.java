
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
            
            public static TableDefined newTableDefined(String tableName){
                return new TableDefined(
                    new TableName(tableName),
                    FD_PLAYERID,
FD_USERID,
FD_ONLINE,
FD_CREATETIME
                );
            }
            
            public static TableDefined newTableDefined(){
                return newTableDefined("Player");
            }
            
            public EQ[] toEQS(){
                return toEQS(this);
            }
            
            public static EQ[] toEQS(Player table){
                EQ[] eqs=new EQ[4];
                eqs[0]=FD_PLAYERID.eq(table.playerId);
eqs[1]=FD_USERID.eq(table.userId);
eqs[2]=FD_ONLINE.eq(table.online);
eqs[3]=FD_CREATETIME.eq(table.createTime);
                return eqs;
            }
        }